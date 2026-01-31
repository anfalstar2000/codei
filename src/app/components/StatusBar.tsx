import { Badge } from '@/app/components/ui/badge';
import { Activity, Globe, Code2, Clock } from 'lucide-react';

export type AgentStatus = 'idle' | 'running' | 'error';

interface StatusBarProps {
  agentStatus: AgentStatus;
  webSearchEnabled: boolean;
  codeInterpreterEnabled: boolean;
  lastRunTime?: string;
}

export function StatusBar({
  agentStatus,
  webSearchEnabled,
  codeInterpreterEnabled,
  lastRunTime,
}: StatusBarProps) {
  const getStatusColor = () => {
    switch (agentStatus) {
      case 'idle':
        return 'bg-green-500';
      case 'running':
        return 'bg-yellow-500 animate-pulse';
      case 'error':
        return 'bg-red-500';
    }
  };

  const getStatusText = () => {
    switch (agentStatus) {
      case 'idle':
        return 'Idle';
      case 'running':
        return 'Running';
      case 'error':
        return 'Error';
    }
  };

  return (
    <div className="h-8 border-t bg-muted/50 flex items-center justify-between px-4 text-xs">
      <div className="flex items-center gap-4">
        {/* Agent Status */}
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3" />
          <span>Agent:</span>
          <Badge variant="outline" className="gap-1.5 h-5">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
            {getStatusText()}
          </Badge>
        </div>

        {/* Tools Status */}
        <div className="flex items-center gap-2">
          <span>Tools:</span>
          <Badge variant={webSearchEnabled ? 'default' : 'secondary'} className="gap-1 h-5">
            <Globe className="w-3 h-3" />
            {webSearchEnabled ? 'On' : 'Off'}
          </Badge>
          <Badge variant={codeInterpreterEnabled ? 'default' : 'secondary'} className="gap-1 h-5">
            <Code2 className="w-3 h-3" />
            {codeInterpreterEnabled ? 'On' : 'Off'}
          </Badge>
        </div>
      </div>

      {/* Last Run Time */}
      {lastRunTime && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Last run: {lastRunTime}</span>
        </div>
      )}
    </div>
  );
}
