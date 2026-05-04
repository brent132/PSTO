"use client";
import { useParams } from "next/navigation";
import ProjectRequirementHeader from "./components/project-requirement-header";
import RequirementList from "./components/requirement-list";
import { useProjectRequirements } from "./hooks/use-fetch-project-requirements";
import { useSaveProjectRequirements } from "./hooks/use-save-project-requirements";
import { useState } from "react";
import { RequirementListRow } from "@/types/requirements";

export default function ProjectRequirementPage() {
  const params = useParams();
  const projectId = String(params.id);
  const { data: requirements, isLoading } = useProjectRequirements(projectId);
  const saveRequirements = useSaveProjectRequirements();
  const [isEditing, setIsEditing] = useState(false);
  const [editableRows, setEditableRows] = useState<RequirementListRow[]>([]);
  const rows = isEditing ? editableRows : (requirements?.data ?? []);
  const projectTitle =
    requirements?.project?.project_title ?? "Requirement list";

  function handleEdit() {
    setEditableRows(requirements?.data ?? []);
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditableRows([]);
  }

  function handleSave() {
    saveRequirements.mutate(
      {
        projectId,
        items: editableRows,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setEditableRows([]);
        },
      },
    );
  }

  function updateRow(
    requirementId: number,
    field: "is_compiled" | "remarks",
    value: boolean | string,
  ) {
    setEditableRows((prev) =>
      prev.map((row) =>
        row.requirement_id === requirementId ? { ...row, [field]: value } : row,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ProjectRequirementHeader
        projectTitle={projectTitle}
        isEditing={isEditing}
        isSaving={saveRequirements.isPending}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />
      <RequirementList
        rows={rows}
        isLoading={isLoading}
        isEditing={isEditing}
        onUpdateRow={updateRow}
      />
    </div>
  );
}
