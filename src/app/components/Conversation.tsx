import { ChatMessage, Message } from '@/app/components/ChatMessage';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface ConversationProps {
  messages: Message[];
  onApplyPatch?: (messageId: string) => void;
}

export function Conversation({ messages, onApplyPatch }: ConversationProps) {
  const [pinnedMessages, setPinnedMessages] = useState<Set<string>>(new Set());

  const handlePin = (messageId: string) => {
    setPinnedMessages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-background">
        <h2 className="font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Conversation
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
              <p>No messages yet</p>
              <p className="text-sm">Start a conversation by running a request</p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onApplyPatch={onApplyPatch}
                onPin={handlePin}
                isPinned={pinnedMessages.has(message.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
