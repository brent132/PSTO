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
  data: ProjectRequirementRow[];
};

// use-save-project-requirements.ts
export type SavePayload = {
  projectId: string;
  items: ProjectRequirementRow[];
};

// requirement-list
export type RequirementListRow = {
  requirement_id: number;
  requirement: string;
  is_compiled: boolean;
  remarks: string;
};
