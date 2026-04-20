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
