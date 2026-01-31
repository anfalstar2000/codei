import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { X } from 'lucide-react';
import { useState } from 'react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSettings?: Settings;
  onSave?: (settings: Settings) => void;
}

export interface Settings {
  allowedDomains: string[];
  searchContextSize: 'small' | 'medium' | 'large';
  model: string;
  reasoningEffort: 'low' | 'medium' | 'high';
  storeConversation: boolean;
  apiKey?: string;
}

export function SettingsModal({
  open,
  onOpenChange,
  initialSettings,
  onSave,
}: SettingsModalProps) {
  const [domains, setDomains] = useState<string[]>(
    initialSettings?.allowedDomains || ['docs.salla.dev']
  );
  const [newDomain, setNewDomain] = useState('');
  const [searchContextSize, setSearchContextSize] = useState<Settings['searchContextSize']>(
    initialSettings?.searchContextSize || 'medium'
  );
  const [model, setModel] = useState(initialSettings?.model || 'gpt-4o');
  const [reasoningEffort, setReasoningEffort] = useState<Settings['reasoningEffort']>(
    initialSettings?.reasoningEffort || 'medium'
  );
  const [storeConversation, setStoreConversation] = useState(
    initialSettings?.storeConversation ?? true
  );
  const [apiKey, setApiKey] = useState(initialSettings?.apiKey || '');

  const handleAddDomain = () => {
    if (newDomain && !domains.includes(newDomain)) {
      setDomains([...domains, newDomain]);
      setNewDomain('');
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setDomains(domains.filter((d) => d !== domain));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        allowedDomains: domains,
        searchContextSize,
        model,
        reasoningEffort,
        storeConversation,
        apiKey,
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your Salla Developer Agent workspace settings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* OpenAI API Key */}
          <div className="space-y-2">
            <Label htmlFor="api-key">OpenAI API Key</Label>
            <p className="text-sm text-muted-foreground">
              Your OpenAI API key for agent execution
            </p>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
            />
            {!apiKey && (
              <p className="text-xs text-yellow-600">
                ⚠️ Agent functionality requires a valid API key
              </p>
            )}
          </div>

          {/* Allowed Domains */}
          <div className="space-y-2">
            <Label>Allowed Domains</Label>
            <p className="text-sm text-muted-foreground">
              Domains that the agent can access during web searches
            </p>
            <div className="flex gap-2">
              <Input
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="e.g., docs.salla.dev"
                onKeyDown={(e) => e.key === 'Enter' && handleAddDomain()}
              />
              <Button type="button" onClick={handleAddDomain}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {domains.map((domain) => (
                <Badge key={domain} variant="secondary" className="gap-1">
                  {domain}
                  <button
                    onClick={() => handleRemoveDomain(domain)}
                    className="hover:bg-muted-foreground/20 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Search Context Size */}
          <div className="space-y-2">
            <Label htmlFor="search-context">Search Context Size</Label>
            <p className="text-sm text-muted-foreground">
              Amount of context to use for web searches
            </p>
            <Select value={searchContextSize} onValueChange={setSearchContextSize}>
              <SelectTrigger id="search-context">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Model */}
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                <SelectItem value="o1">O1</SelectItem>
                <SelectItem value="o1-mini">O1 Mini</SelectItem>
                <SelectItem value="gpt-5.2">GPT-5.2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reasoning Effort */}
          <div className="space-y-2">
            <Label htmlFor="reasoning">Reasoning Effort</Label>
            <p className="text-sm text-muted-foreground">
              Computational effort for reasoning tasks
            </p>
            <Select value={reasoningEffort} onValueChange={setReasoningEffort}>
              <SelectTrigger id="reasoning">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Store Conversation */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Store Conversation</Label>
              <p className="text-sm text-muted-foreground">
                Save conversation history for this session
              </p>
            </div>
            <Switch checked={storeConversation} onCheckedChange={setStoreConversation} />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}