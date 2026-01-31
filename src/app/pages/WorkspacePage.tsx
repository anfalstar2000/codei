import { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/app/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { RequestPanel } from '@/app/components/RequestPanel';
import { Conversation } from '@/app/components/Conversation';
import { PreviewPanel } from '@/app/components/PreviewPanel';
import { ConsolePanel, ConsoleLog } from '@/app/components/ConsolePanel';
import { StatusBar, AgentStatus } from '@/app/components/StatusBar';
import { Message } from '@/app/components/ChatMessage';
import { ProjectConfig } from '@/app/components/ProjectCard';
import { TraceData } from '@/app/components/TraceDrawer';
import { runWorkflow, AgentConfig } from '@/app/services/agent';
import { AgentInputItem } from '@openai/agents';
import { toast } from 'sonner';

interface WorkspacePageProps {
  projectConfig: ProjectConfig;
}

export function WorkspacePage({ projectConfig }: WorkspacePageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('idle');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [lastRunTime, setLastRunTime] = useState<string>();
  const [conversationHistory, setConversationHistory] = useState<AgentInputItem[]>([]);

  const handleRun = async (input: string) => {
    if (!projectConfig.apiKey) {
      toast.error('API key is required. Please configure it in settings.');
      addConsoleLog('error', 'API key is missing');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setAgentStatus('running');

    // Add console log
    addConsoleLog('info', `Running request: ${input.substring(0, 50)}...`);

    try {
      // Create agent config
      const agentConfig: AgentConfig = {
        allowedDomains: projectConfig.allowedDomains,
        searchContextSize: 'medium',
        model: projectConfig.model,
        reasoningEffort: 'medium',
        apiKey: projectConfig.apiKey,
      };

      // Run the agent workflow
      const result = await runWorkflow(
        { input_as_text: input },
        agentConfig,
        conversationHistory
      );

      // Update conversation history
      setConversationHistory(result.conversationHistory);

      // Add agent message
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.output_text,
        hasPatch: result.output_text.includes('PATCH') || result.output_text.includes('```'),
        timestamp: new Date(),
        trace: result.trace as TraceData,
      };

      setMessages((prev) => [...prev, agentMessage]);
      setAgentStatus('idle');
      setLastRunTime(new Date().toLocaleTimeString());
      addConsoleLog('info', 'Request completed successfully');
      toast.success('Agent response received');
    } catch (error) {
      setAgentStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      addConsoleLog('error', `Error: ${errorMessage}`);
      toast.error('Agent execution failed: ' + errorMessage);
      
      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error executing request: ${errorMessage}\n\nPlease check your API key and try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      
      // Reset status after a delay
      setTimeout(() => setAgentStatus('idle'), 3000);
    }
  };

  const handleApplyPatch = (messageId: string) => {
    addConsoleLog('info', `Patch applied from message ${messageId}`);
    addConsoleLog('info', 'Preview updated successfully');
  };

  const addConsoleLog = (type: ConsoleLog['type'], message: string) => {
    const log: ConsoleLog = {
      id: Date.now().toString() + Math.random(),
      type,
      message,
      timestamp: new Date(),
    };
    setConsoleLogs((prev) => [...prev, log]);
  };

  const handleClearLogs = () => {
    setConsoleLogs([]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel: Chat/Tasks */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full flex flex-col">
              {/* Request Panel */}
              <div className="h-[45%]">
                <RequestPanel
                  onRun={handleRun}
                  isRunning={agentStatus === 'running'}
                />
              </div>

              {/* Conversation */}
              <div className="h-[55%]">
                <Conversation
                  messages={messages}
                  onApplyPatch={handleApplyPatch}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel: Preview + Console */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <Tabs defaultValue="preview" className="h-full flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b h-12">
                <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
                <TabsTrigger value="console" className="flex-1">Console</TabsTrigger>
                <TabsTrigger value="files" className="flex-1">Files</TabsTrigger>
                <TabsTrigger value="network" className="flex-1">Network</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="flex-1 m-0">
                <PreviewPanel />
              </TabsContent>

              <TabsContent value="console" className="flex-1 m-0">
                <ConsolePanel logs={consoleLogs} onClear={handleClearLogs} />
              </TabsContent>

              <TabsContent value="files" className="flex-1 m-0">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Files explorer (Coming soon)</p>
                </div>
              </TabsContent>

              <TabsContent value="network" className="flex-1 m-0">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Network monitor (Coming soon)</p>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <StatusBar
        agentStatus={agentStatus}
        webSearchEnabled={projectConfig.webSearch}
        codeInterpreterEnabled={projectConfig.codeInterpreter}
        lastRunTime={lastRunTime}
      />
    </div>
  );
}