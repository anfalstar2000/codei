import { Copy, Pin, FileCode } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { TraceDrawer, TraceData } from '@/app/components/TraceDrawer';
import { useState } from 'react';
import { toast } from 'sonner';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hasPatch?: boolean;
  timestamp: Date;
  trace?: TraceData;
}

interface ChatMessageProps {
  message: Message;
  onApplyPatch?: (messageId: string) => void;
  onPin?: (messageId: string) => void;
  isPinned?: boolean;
}

export function ChatMessage({ message, onApplyPatch, onPin, isPinned }: ChatMessageProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Message copied to clipboard');
  };

  const handleApplyPatch = () => {
    if (onApplyPatch) {
      onApplyPatch(message.id);
      toast.success('Patch applied to preview');
    }
  };

  return (
    <div
      className={`p-4 rounded-lg ${
        message.role === 'user'
          ? 'bg-primary/10 ml-8'
          : 'bg-muted mr-8'
      } ${isPinned ? 'ring-2 ring-primary' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge variant={message.role === 'user' ? 'default' : 'secondary'}>
            {message.role === 'user' ? 'You' : 'Agent'}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString()}
          </span>
          {message.hasPatch && (
            <Badge variant="outline" className="gap-1">
              <FileCode className="w-3 h-3" />
              Patch Available
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          {message.role === 'assistant' && (
            <TraceDrawer trace={message.trace} messageId={message.id} />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 w-7 p-0"
          >
            <Copy className="w-3 h-3" />
          </Button>
          {onPin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPin(message.id)}
              className="h-7 w-7 p-0"
            >
              <Pin className={`w-3 h-3 ${isPinned ? 'fill-current' : ''}`} />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-sm max-w-none">
        <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
      </div>

      {/* Apply Patch Button */}
      {message.hasPatch && onApplyPatch && (
        <div className="mt-3 pt-3 border-t">
          <Button onClick={handleApplyPatch} size="sm" variant="outline">
            <FileCode className="w-4 h-4 mr-2" />
            Apply Patch
          </Button>
        </div>
      )}
    </div>
  );
}