// create project
export type CreateProjectPayload = {
  project_title: string;
};

// create project | use-fetch-projects
export type Project = {
  id: number;
  project_title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Response = {
  data: Project[];
  total: number;
  page: number;
  lastPage: number;
};
