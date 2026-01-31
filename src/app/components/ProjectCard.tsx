import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { Badge } from '@/app/components/ui/badge';
import { X } from 'lucide-react';
import { useState } from 'react';

interface ProjectCardProps {
  onOpenWorkspace: (config: ProjectConfig) => void;
}

export interface ProjectConfig {
  name: string;
  allowedDomains: string[];
  model: string;
  webSearch: boolean;
  codeInterpreter: boolean;
  apiKey?: string;
}

export function ProjectCard({ onOpenWorkspace }: ProjectCardProps) {
  const [projectName, setProjectName] = useState('My Salla Project');
  const [domains, setDomains] = useState<string[]>(['docs.salla.dev']);
  const [newDomain, setNewDomain] = useState('');
  const [model, setModel] = useState('gpt-4o');
  const [webSearch, setWebSearch] = useState(true);
  const [codeInterpreter, setCodeInterpreter] = useState(true);
  const [apiKey, setApiKey] = useState('');

  const handleAddDomain = () => {
    if (newDomain && !domains.includes(newDomain)) {
      setDomains([...domains, newDomain]);
      setNewDomain('');
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setDomains(domains.filter(d => d !== domain));
  };

  const handleOpenWorkspace = () => {
    onOpenWorkspace({
      name: projectName,
      allowedDomains: domains,
      model,
      webSearch,
      codeInterpreter,
      apiKey,
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Project Configuration</CardTitle>
        <CardDescription>
          Configure your Salla Developer Agent workspace
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Name */}
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
          />
        </div>

        {/* OpenAI API Key */}
        <div className="space-y-2">
          <Label htmlFor="api-key">OpenAI API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
          />
          <p className="text-xs text-muted-foreground">
            Required for agent functionality. Your key is stored locally.
          </p>
        </div>

        {/* Allowed Domains */}
        <div className="space-y-2">
          <Label>Allowed Domains</Label>
          <div className="flex gap-2">
            <Input
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="e.g., docs.salla.dev"
              onKeyDown={(e) => e.key === 'Enter' && handleAddDomain()}
            />
            <Button type="button" onClick={handleAddDomain}>Add</Button>
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

        {/* Model Selection */}
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

        {/* Tools Toggles */}
        <div className="space-y-4">
          <Label>Tools</Label>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Web Search</div>
              <div className="text-sm text-muted-foreground">
                Enable web search capabilities
              </div>
            </div>
            <Switch checked={webSearch} onCheckedChange={setWebSearch} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Code Interpreter</div>
              <div className="text-sm text-muted-foreground">
                Enable code execution and analysis
              </div>
            </div>
            <Switch checked={codeInterpreter} onCheckedChange={setCodeInterpreter} />
          </div>
        </div>

        {/* Open Workspace Button */}
        <Button onClick={handleOpenWorkspace} className="w-full" size="lg" disabled={!apiKey}>
          Open Workspace
        </Button>
        {!apiKey && (
          <p className="text-xs text-center text-yellow-600">
            ⚠️ API key is required to open workspace
          </p>
        )}
      </CardContent>
    </Card>
  );
}