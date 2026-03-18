export type ProjectProps = {
  id: number;
  project_code: string;
  project_name: string;
  fiscal_year: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: string;
  description: string;
  manager_name: string;
  created_at: string;
  updated_at: string;
};

export type ProjectForm = {
  project_code: string;
  project_name: string;
  fiscal_year: string;
  budget: string;
  start_date: string;
  end_date: string;
  status: string;
  description: string;
  manager_name: string;
};

export type ProjectDialogFormProps = {
  mode: "create" | "edit";
  project?: ProjectProps;
  trigger: React.ReactNode;
};

export type EditProjectProps = {
  project: ProjectProps;
};

export type DeleteProjectDialogProps = {
  projectId: number;
};

export type ProjectHeaderProps = {
  tab: string;
  onTabChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
};

export type SearchProjectsProps = {
  value: string;
  onChange: (value: string) => void;
};

export type ProjectsListViewProps = {
  search: string;
  status: string;
};
