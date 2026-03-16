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
