export interface Project {
  id: number;
  title: string;
  category: string;
  section: string;
  status: 'Live' | 'Demo' | 'Local' | 'Planning';
  image?: string;
  description: string;
  highlights: string[];
  tech: string[];
  url?: string;
  repoName?: string;
  videoUrl?: string;
  mediaLabel?: string;
  featured?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}
