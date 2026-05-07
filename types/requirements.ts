export type CreateRequirementPayload = {
  requirement: string;
};

export type Requirement = {
  id: number;
  requirement: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
export type RequirementsResponse = {
  data: Requirement[];
};

// app/api/projects/[id]/requirements/route.ts
export type Context = {
  params: Promise<{
    id: string;
  }>;
};

export type RequirementInput = {
  requirement_id: number;
  is_compiled: boolean;
  remarks?: string | null;
};

// use-fetch-project-requirements.ts
export type ProjectRequirementRow = {
  requirement_id: number;
  requirement: string;
  is_compiled: boolean;
  remarks: string;
};

export type ProjectRequirementsResponse = {
  project: {
    id: number;
    project_title: string;
  } | null;
  data: ProjectRequirementRow[];
};

// requirement-list
export type RequirementListRow = {
  requirement_id: number;
  requirement: string;
  is_compiled: boolean;
  remarks: string;
};

export type RequirementListProps = {
  projectId: string;
  rows: RequirementListRow[];
  isLoading: boolean;
};

// requirement-header
export type ProjectRequirementHeaderProps = {
  projectTitle: string;
};

// app/api/requirements/[id]/route.ts
export type UpdateRequirementContext = {
  params: Promise<{
    id: string;
  }>;
};

export type updateRequirementPayload = {
  requirementId: number;
  requirement: string;
};

// UpdateRequirementForm
export type UpdateRequirementFormProps = {
  requirementId: number;
  initialRequirement: string;
};

// use-delete-requirement.ts
export type DeleteRequirementPayload = {
  id: number;
};

// delete-requirement-button.tsx
export type DeleteRequirementButtonProps = {
  id: number;
};

// app/api/projects/[id]/requirements/[requirementId]/route.ts
export type RequirementIdContext = {
  params: Promise<{
    id: string;
    requirementId: string;
  }>;
};

// hooks/use-update-project-requirement.ts
export type UpdateProjectRequirementPayload = {
  projectId: string;
  requirementId: number;
  is_compiled: boolean;
  remarks?: string | null;
};
