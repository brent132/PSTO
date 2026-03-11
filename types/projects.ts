export type ProjectProps = {
  id: number;
  project_code: string;
  project_name: string;
  fiscal_year: string;
  budget: number;
  start_date: Date;
  end_date: Date;
  status: string;
  description: string;
  manager_name: string;
  created_at: Date;
  updated_at: Date;
};

export type ProjectForm = {
  project_code: string;
  project_name: string;
  fiscal_year: string;
  budget: number | "";
  start_date: string;
  end_date: string;
  status: string;
  description: string;
  manager_name: string;
};
