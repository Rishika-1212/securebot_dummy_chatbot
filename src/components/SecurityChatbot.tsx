
import React, { useState, useRef, useEffect } from 'react';
import { Shield, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { analyzeSecurityQuestion } from '@/lib/security-utils';
import { ChatMessage } from './chat/ChatMessage';
import { ChatInput } from './chat/ChatInput';

export function SecurityChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // Generate security-focused response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: analyzeSecurityQuestion(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    
    files.forEach(file => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `Analyzing file: ${file.name}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);

      // Simulate file security analysis
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `Security Analysis for ${file.name}:\n- File type: ${file.type || 'unknown'}\n- Size: ${(file.size / 1024).toFixed(2)} KB\n- Running security checks...\n\nRecommendation: Always scan files before opening them and verify the source.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1500);
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        <Shield className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-primary text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <h3 className="font-semibold">Security Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div
            className={cn(
              "flex-1 overflow-y-auto p-4 space-y-4",
              isDragging && "bg-gray-50"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            setMessages={setMessages}
          />
        </div>
      )}
    </div>
  );
}
