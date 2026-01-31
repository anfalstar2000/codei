import { useState } from 'react';
import { Toaster } from '@/app/components/ui/sonner';
import { TopBar } from '@/app/components/TopBar';
import { HomePage } from '@/app/pages/HomePage';
import { WorkspacePage } from '@/app/pages/WorkspacePage';
import { SettingsModal, Settings } from '@/app/components/SettingsModal';
import { ProjectConfig } from '@/app/components/ProjectCard';

type View = 'home' | 'workspace';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [projectConfig, setProjectConfig] = useState<ProjectConfig | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isPreviewConnected, setIsPreviewConnected] = useState(false);

  const handleOpenWorkspace = (config: ProjectConfig) => {
    setProjectConfig(config);
    setCurrentView('workspace');
    setIsPreviewConnected(true);
  };

  const handleSettingsSave = (settings: Settings) => {
    if (projectConfig) {
      setProjectConfig({
        ...projectConfig,
        allowedDomains: settings.allowedDomains,
        model: settings.model,
        webSearch: projectConfig.webSearch,
        codeInterpreter: projectConfig.codeInterpreter,
        apiKey: settings.apiKey,
      });
    }
  };

  const getCurrentSettings = (): Settings | undefined => {
    if (!projectConfig) return undefined;
    
    return {
      allowedDomains: projectConfig.allowedDomains,
      searchContextSize: 'medium',
      model: projectConfig.model,
      reasoningEffort: 'medium',
      storeConversation: true,
      apiKey: projectConfig.apiKey,
    };
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopBar
        isConnected={isPreviewConnected}
        onSettingsClick={() => setSettingsOpen(true)}
        onExportClick={() => console.log('Export clicked')}
        onDeployClick={() => console.log('Deploy clicked')}
      />

      <div className="flex-1 overflow-hidden">
        {currentView === 'home' ? (
          <HomePage onOpenWorkspace={handleOpenWorkspace} />
        ) : projectConfig ? (
          <WorkspacePage projectConfig={projectConfig} />
        ) : null}
      </div>

      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        initialSettings={getCurrentSettings()}
        onSave={handleSettingsSave}
      />

      <Toaster />
    </div>
  );
}