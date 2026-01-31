import { Settings, Share2, Rocket } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

interface TopBarProps {
  isConnected?: boolean;
  onSettingsClick?: () => void;
  onExportClick?: () => void;
  onDeployClick?: () => void;
}

export function TopBar({
  isConnected = false,
  onSettingsClick,
  onExportClick,
  onDeployClick,
}: TopBarProps) {
  return (
    <div className="h-14 border-b bg-background flex items-center justify-between px-4">
      {/* Logo + Project Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <h1 className="font-semibold text-lg">Salla Developer Agent</h1>
        <Badge variant={isConnected ? 'default' : 'secondary'} className="ml-2">
          Preview: {isConnected ? 'Connected' : 'Disconnected'}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onExportClick && (
          <Button variant="ghost" size="sm" onClick={onExportClick}>
            <Share2 className="w-4 h-4 mr-2" />
            Export
          </Button>
        )}
        {onDeployClick && (
          <Button variant="ghost" size="sm" onClick={onDeployClick}>
            <Rocket className="w-4 h-4 mr-2" />
            Deploy
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onSettingsClick}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}
