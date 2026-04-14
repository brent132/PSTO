// create project
export type CreateProjectPayload = {
  project_title: string;
};

export type Project = {
  id: number;
  project_title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
