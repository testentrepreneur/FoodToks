import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@supabase/auth-helpers-react';

interface Message {
  id: string;
  message: string;
  is_bot: boolean;
  created_at: string;
  user_id: string;
}

export function AIAssistant() {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const handleSend = async () => {
    if (!input.trim() || !session?.user) return;

    // Add user message
    const userMessage = {
      message: input,
      is_bot: false,
      user_id: session.user.id,
      created_at: new Date().toISOString(),
    };

    try {
      const { error: insertError } = await supabase
        .from('chat_history')
        .insert([userMessage]);

      if (insertError) throw insertError;

      setInput('');
      fetchChatHistory();

      // Simulate bot response (replace with actual AI integration)
      const botMessage = {
        message: "I'm here to help! How can I assist you today?",
        is_bot: true,
        user_id: session.user.id,
        created_at: new Date().toISOString(),
      };

      const { error: botError } = await supabase
        .from('chat_history')
        .insert([botMessage]);

      if (botError) throw botError;

      fetchChatHistory();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-[350px] h-[500px] flex flex-col shadow-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
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
                        ? 'bg-secondary'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {message.message}
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
                onClick={() => setIsRecording(!isRecording)}
                className={isRecording ? 'text-red-500' : ''}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          className="rounded-full h-12 w-12 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Maximize2 className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}