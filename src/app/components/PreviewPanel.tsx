import { Button } from '@/app/components/ui/button';
import { Monitor, Tablet, Smartphone, RefreshCw, ExternalLink } from 'lucide-react';
import { useState } from 'react';

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

export function PreviewPanel() {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'desktop':
        return '100%';
      case 'tablet':
        return '834px';
      case 'mobile':
        return '390px';
    }
  };

  return (
    <div className="flex flex-col h-full bg-muted/30">
      {/* Controls */}
      <div className="p-3 border-b bg-background flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewport === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewport('desktop')}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={viewport === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewport('tablet')}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={viewport === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewport('mobile')}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 overflow-auto flex justify-center">
        <div
          key={refreshKey}
          className="bg-background border rounded-lg shadow-lg transition-all duration-300"
          style={{
            width: getViewportWidth(),
            height: '100%',
            maxWidth: '100%',
          }}
        >
          <div className="p-8 h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Preview Window</p>
              <p className="text-sm mt-2">
                Applied patches will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
