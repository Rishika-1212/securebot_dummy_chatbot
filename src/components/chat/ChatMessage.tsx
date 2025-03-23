
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex",
        message.type === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          message.type === 'user'
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-900"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
