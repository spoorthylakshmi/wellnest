import { useState } from "react";
import { X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Floating Chatbot UI Component
 * Connected to Flask backend (/api/chatbot)
 */

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your wellness assistant. How can I help you today? 🌿",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  // ✅ BACKEND-CONNECTED SEND HANDLER
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
    };

    // Show user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: userMessage.id + 1,
        text: data.reply,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: userMessage.id + 1,
        text: "⚠️ Sorry, the server is not responding right now.",
        isBot: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">
                  Wellness Guide
                </h3>
                <p className="text-xs text-primary-foreground/70">
                  Always here to help
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.isBot ? "" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot
                      ? "bg-primary text-primary-foreground"
                      : "bg-wellness-lavender text-accent-foreground"
                  }`}
                >
                  {message.isBot ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    message.isBot
                      ? "bg-card text-card-foreground rounded-tl-none"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                size="icon"
                onClick={handleSend}
                className="rounded-full"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Powered by Flask backend
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-muted text-muted-foreground hover:bg-muted" : ""
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default FloatingChatbot;
