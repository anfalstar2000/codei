import { ProjectCard, ProjectConfig } from '@/app/components/ProjectCard';

interface HomePageProps {
  onOpenWorkspace: (config: ProjectConfig) => void;
}

export function HomePage({ onOpenWorkspace }: HomePageProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="w-full flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Welcome to Salla Developer Agent</h1>
          <p className="text-muted-foreground text-lg">
            Your AI-powered development workspace for Salla platform
          </p>
        </div>
        
        <ProjectCard onOpenWorkspace={onOpenWorkspace} />
      </div>
    </div>
  );
}
