import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Trash2, Filter, Terminal } from 'lucide-react';
import { useState } from 'react';

export interface ConsoleLog {
  id: string;
  type: 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
}

interface ConsolePanelProps {
  logs: ConsoleLog[];
  onClear?: () => void;
}

export function ConsolePanel({ logs, onClear }: ConsolePanelProps) {
  const [filter, setFilter] = useState<'all' | 'info' | 'warn' | 'error'>('all');

  const filteredLogs = logs.filter((log) => filter === 'all' || log.type === filter);

  const getLogColor = (type: ConsoleLog['type']) => {
    switch (type) {
      case 'info':
        return 'text-blue-500';
      case 'warn':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
    }
  };

  const getLogBadgeVariant = (type: ConsoleLog['type']): 'default' | 'secondary' | 'destructive' => {
    switch (type) {
      case 'info':
        return 'default';
      case 'warn':
        return 'secondary';
      case 'error':
        return 'destructive';
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-green-400 font-mono text-sm">
      {/* Controls */}
      <div className="p-3 border-b border-green-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span className="font-semibold">Console</span>
          <Badge variant="outline" className="ml-2">
            {filteredLogs.length} {filteredLogs.length === 1 ? 'log' : 'logs'}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="bg-transparent border border-green-900 rounded px-2 py-1 text-xs"
          >
            <option value="all">All</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-green-400 hover:text-green-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Logs */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredLogs.length === 0 ? (
            <div className="text-center text-green-600 py-8">
              No logs to display
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="flex gap-3 items-start">
                <span className="text-green-600 text-xs whitespace-nowrap">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <Badge
                  variant={getLogBadgeVariant(log.type)}
                  className="shrink-0 text-xs"
                >
                  {log.type.toUpperCase()}
                </Badge>
                <span className={getLogColor(log.type)}>{log.message}</span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
