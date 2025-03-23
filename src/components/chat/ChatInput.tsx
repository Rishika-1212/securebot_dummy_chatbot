
import { Send, Upload } from 'lucide-react';
import { Message } from '@/types/chat';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function ChatInput({ input, setInput, handleSend, setMessages }: ChatInputProps) {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex space-x-2">
        <button
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Upload className="h-5 w-5" />
          <input
            id="file-input"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              files.forEach(file => {
                const newMessage: Message = {
                  id: Date.now().toString(),
                  type: 'user',
                  content: `Analyzing file: ${file.name}`,
                  timestamp: new Date(),
                };
                setMessages((prev) => [...prev, newMessage]);
              });
            }}
          />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your security question..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          onClick={handleSend}
          className="p-2 text-primary hover:text-primary/80 transition-colors"
          disabled={!input.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
