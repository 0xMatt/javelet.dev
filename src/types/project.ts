export interface ProjectItem {
  id: number;
  name: string;
  slug: string;
  summary: string;
  repository: string | null;
  website: string | null;
  tech: string[];
  views: number;
  createdAt: Date;
}

export interface Tech {
  id: number;
  name: string;
  projectId: number;
  project: ProjectItem;
  url?: string;
  code?: string;
}

export interface ProjectFormData {
  name: string;
  summary: string;
  repository: string;
  website: string;
}

export interface ProjectActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof ProjectFormData]?: string[];
  };
  payload?: ProjectFormData | null;
}
