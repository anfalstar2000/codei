import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Separator } from '@/app/components/ui/separator';
import { Bug, Search, Code2, Clock, Zap } from 'lucide-react';

export interface TraceData {
  toolCalls: Array<{
    id: string;
    name: string;
    input: string;
    output: string;
    duration: number;
  }>;
  searchQueries: Array<{
    id: string;
    query: string;
    results: number;
    duration: number;
  }>;
  executionLogs: Array<{
    id: string;
    message: string;
    timestamp: Date;
  }>;
  metrics: {
    totalTokens: number;
    totalLatency: number;
    requestTime: Date;
  };
}

interface TraceDrawerProps {
  trace?: TraceData;
  messageId?: string;
}

export function TraceDrawer({ trace, messageId }: TraceDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Bug className="w-4 h-4 mr-2" />
          Trace
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Execution Trace</SheetTitle>
          <SheetDescription>
            Detailed execution information for message {messageId || 'N/A'}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6 pr-4">
            {trace ? (
              <>
                {/* Metrics */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Performance Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="text-xs text-muted-foreground">Total Tokens</div>
                      <div className="text-lg font-semibold">{trace.metrics.totalTokens.toLocaleString()}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="text-xs text-muted-foreground">Total Latency</div>
                      <div className="text-lg font-semibold">{trace.metrics.totalLatency}ms</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Request time: {trace.metrics.requestTime.toLocaleString()}
                  </div>
                </div>

                <Separator />

                {/* Tool Calls */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Tool Calls ({trace.toolCalls.length})
                  </h3>
                  <div className="space-y-3">
                    {trace.toolCalls.map((call) => (
                      <div key={call.id} className="p-3 rounded-lg bg-muted space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{call.name}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {call.duration}ms
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1">Input:</div>
                          <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
                            {call.input}
                          </pre>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1">Output:</div>
                          <pre className="text-xs bg-background p-2 rounded overflow-x-auto max-h-32 overflow-y-auto">
                            {call.output}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Search Queries */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Search Queries ({trace.searchQueries.length})
                  </h3>
                  <div className="space-y-2">
                    {trace.searchQueries.map((query) => (
                      <div key={query.id} className="p-3 rounded-lg bg-muted">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{query.query}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {query.duration}ms
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {query.results} results found
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Execution Logs */}
                <div>
                  <h3 className="font-semibold mb-3">Execution Logs ({trace.executionLogs.length})</h3>
                  <div className="space-y-2">
                    {trace.executionLogs.map((log) => (
                      <div key={log.id} className="text-xs font-mono p-2 rounded bg-muted">
                        <span className="text-muted-foreground mr-2">
                          [{log.timestamp.toLocaleTimeString()}]
                        </span>
                        {log.message}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Bug className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No trace data available</p>
                <p className="text-sm mt-2">Trace information will appear here after execution</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
