import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, X, Maximize2, Minimize2, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@supabase/auth-helpers-react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  message: string;
  is_bot: boolean;
  created_at: string;
  user_id: string;
  is_voice_message?: boolean;
  voice_transcription?: string;
}

export function AIAssistant() {
  const session = useSession();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchChatHistory();
    }
  }, [session]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChatHistory = async () => {
    if (!session?.user) return;

    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching chat history:', error);
      return;
    }

    setMessages(data || []);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await handleVoiceMessage(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceMessage = async (audioBlob: Blob) => {
    if (!session?.user) return;
    setIsProcessing(true);

    try {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        await processMessage(transcript, true);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event);
        toast({
          title: "Error",
          description: "Could not process voice message. Please try again.",
          variant: "destructive"
        });
      };

      recognition.start();
      audio.play();
    } catch (error) {
      console.error('Error processing voice message:', error);
      toast({
        title: "Error",
        description: "Could not process voice message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processMessage = async (message: string, isVoice: boolean = false) => {
    if (!session?.user) return;
    setIsProcessing(true);

    try {
      const response = await supabase.functions.invoke('chat-ai', {
        body: {
          message,
          userId: session.user.id,
          isVoice
        }
      });

      if (response.error) throw response.error;

      const { data } = response;
      
      if (data.audioUrl && isVoice) {
        const audio = new Audio(data.audioUrl);
        audio.play();
      }

      fetchChatHistory();
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Could not process message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setInput('');
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !session?.user) return;
    await processMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-[350px] h-[500px] flex flex-col shadow-lg animate-slide-up">
          <div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              <h3 className="font-semibold">Rina - Your Food AI Assistant</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4" ref={scrollRef}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.is_bot ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.is_bot
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {message.message}
                    {message.is_voice_message && (
                      <span className="text-xs ml-2">🎤</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={isRecording ? stopRecording : startRecording}
                className={isRecording ? 'text-red-500' : ''}
                disabled={isProcessing}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Ask Rina about food..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isProcessing}
              />
              <Button 
                size="icon" 
                onClick={handleSend}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center bg-primary text-primary-foreground"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
}
