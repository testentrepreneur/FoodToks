import { Header } from "@/components/ui/header";
import { Footer } from "@/components/landing/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-4">Subscribe to Our Service</h1>
          <p className="text-xl">
            To subscribe, please contact us at{" "}
            <a href="mailto:info@foodtoks.com" className="text-primary hover:underline">
              info@foodtoks.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}