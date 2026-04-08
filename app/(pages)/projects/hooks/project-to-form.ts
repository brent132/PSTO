import { formatMoneyOnBlur } from "@/hooks/number-format";
import { ProjectForm, ProjectProps } from "@/types/projects";

export const EMPTY_PROJECT_FORM: ProjectForm = {
  project_code: "",
  project_name: "",
  fiscal_year: "",
  budget: "",
  start_date: "",
  end_date: "",
  status: "",
  description: "",
  manager_name: "",
};

export function projectToForm(project?: ProjectProps): ProjectForm {
  if (!project) return EMPTY_PROJECT_FORM;

  return {
    project_code: project.project_code ?? "",
    project_name: project.project_name ?? "",
    fiscal_year: project.fiscal_year ?? "",
    budget:
      project.budget !== undefined && project.budget !== null
        ? formatMoneyOnBlur(String(project.budget))
        : "",
    start_date: project.start_date ?? "",
    end_date: project.end_date ?? "",
    status: project.status ?? "",
    description: project.description ?? "",
    manager_name: project.manager_name ?? "",
  };
}
