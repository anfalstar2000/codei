import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { Play, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface RequestPanelProps {
  onRun: (input: string) => void;
  isRunning?: boolean;
}

const PROMPT_PRESETS = [
  { label: 'SEO Audit', value: 'Perform a comprehensive SEO audit for my Salla store' },
  { label: 'Theme Patch', value: 'Create a patch to customize the theme header' },
  { label: 'API Integration', value: 'Integrate with Salla Orders API to fetch recent orders' },
  { label: 'Product Sync', value: 'Build a product sync workflow with external inventory' },
  { label: 'Custom Widget', value: 'Create a custom dashboard widget for sales analytics' },
];

export function RequestPanel({ onRun, isRunning = false }: RequestPanelProps) {
  const [input, setInput] = useState('');

  const handleRun = () => {
    if (input.trim()) {
      onRun(input);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const handlePresetClick = (value: string) => {
    setInput(value);
  };

  return (
    <div className="flex flex-col h-full border-b bg-muted/30">
      <div className="p-4 border-b bg-background">
        <h2 className="font-semibold">Request Panel</h2>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Prompt Presets */}
        <div>
          <label className="text-sm font-medium mb-2 block">Prompt Presets</label>
          <div className="flex flex-wrap gap-2">
            {PROMPT_PRESETS.map((preset) => (
              <Badge
                key={preset.label}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => handlePresetClick(preset.value)}
              >
                {preset.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Input Textarea */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Task Description</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want the agent to do..."
            className="min-h-[200px] font-mono text-sm resize-none"
            disabled={isRunning}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleRun}
            disabled={!input.trim() || isRunning}
            className="flex-1"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run'}
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={isRunning}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
