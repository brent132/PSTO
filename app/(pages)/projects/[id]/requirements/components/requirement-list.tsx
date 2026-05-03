"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { useProjectRequirements } from "../hooks/use-fetch-project-requirements";
import { useSaveProjectRequirements } from "../hooks/use-save-project-requirements";
import { RequirementListRow } from "@/types/requirements";

export default function RequirementList() {
  const params = useParams();
  const projectId = String(params.id);

  const { data: requirements, isLoading } = useProjectRequirements(projectId);
  const saveRequirements = useSaveProjectRequirements();

  const [isEditing, setIsEditing] = useState(false);
  const [editableRows, setEditableRows] = useState<RequirementListRow[]>([]);

  const rows = isEditing ? editableRows : (requirements?.data ?? []);

  function handleEdit() {
    setEditableRows(requirements?.data ?? []);
    setIsEditing(true);
  }

  function updateRow(
    requirementId: number,
    field: "is_compiled" | "remarks",
    value: boolean | string,
  ) {
    setEditableRows((prev) =>
      prev.map((row) =>
        row.requirement_id === requirementId
          ? {
              ...row,
              [field]: value,
            }
          : row,
      ),
    );
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

  function handleCancel() {
    setIsEditing(false);
    setEditableRows([]);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!isEditing ? (
        <Button onClick={handleEdit}>Edit</Button>
      ) : (
        <>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>

          <Button onClick={handleSave} disabled={saveRequirements.isPending}>
            {saveRequirements.isPending ? "Saving..." : "Save"}
          </Button>
        </>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Requirement</TableHead>
            <TableHead>Compiled</TableHead>
            <TableHead>Not compiled</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.requirement_id}>
              <TableCell>{row.requirement}</TableCell>

              <TableCell>
                <Input
                  type="radio"
                  name={`compiled-${row.requirement_id}`}
                  checked={row.is_compiled === true}
                  disabled={!isEditing}
                  onChange={() =>
                    updateRow(row.requirement_id, "is_compiled", true)
                  }
                />
              </TableCell>

              <TableCell>
                <Input
                  type="radio"
                  name={`compiled-${row.requirement_id}`}
                  checked={row.is_compiled === false}
                  disabled={!isEditing}
                  onChange={() =>
                    updateRow(row.requirement_id, "is_compiled", false)
                  }
                />
              </TableCell>

              <TableCell>
                <Textarea
                  value={row.remarks ?? ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    updateRow(row.requirement_id, "remarks", e.target.value)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
