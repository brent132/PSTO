import { RequirementListProps } from "@/types/requirements";
import { useUpdateProjectRequirement } from "../hooks/use-update-project-requirement";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ListChecks, Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import UpdateRequirementForm from "./update-requirement-form";
import DeleteRequirementButton from "./delete-requirement-button";

export default function Requirementlist({
  projectId,
  rows,
  isLoading,
}: RequirementListProps) {
  const updateProjectRequirement = useUpdateProjectRequirement();
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [draft, setDraft] = useState({ is_compiled: false, remarks: "" });

  function handleEditRow(row: {
    requirement_id: number;
    is_compiled: boolean;
    remarks?: string | null;
  }) {
    setEditingRowId(row.requirement_id);
    setDraft({ is_compiled: row.is_compiled, remarks: row.remarks ?? "" });
  }

  function handleCancelRow() {
    setEditingRowId(null);

    setDraft({
      is_compiled: false,
      remarks: "",
    });
  }

  function handleSaveRow(requirementId: number) {
    updateProjectRequirement.mutate(
      {
        projectId,
        requirementId,
        is_compiled: draft.is_compiled,
        remarks: draft.remarks,
      },
      {
        onSuccess: () => {
          setEditingRowId(null);
        },
      },
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Requirement</TableHead>
            <TableHead>Compiled</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const isRowEditing = editingRowId === row.requirement_id;

            return (
              <TableRow key={row.requirement_id}>
                <TableCell className="whitespace-normal">
                  <p className="text-xs">{row.requirement}</p>
                </TableCell>

                <TableCell align="center">
                  {isRowEditing ? (
                    <Checkbox
                      checked={draft.is_compiled}
                      onCheckedChange={(checked) =>
                        setDraft((prev) => ({
                          ...prev,
                          is_compiled: checked === true,
                        }))
                      }
                    />
                  ) : row.is_compiled ? (
                    <Check className="w-8 h-8 text-primary" />
                  ) : (
                    <X className="w-8 h-8 text-destructive" />
                  )}
                </TableCell>

                <TableCell className="whitespace-normal">
                  {isRowEditing ? (
                    <Textarea
                      value={draft.remarks}
                      className="text-xs"
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          remarks: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-xs">{row.remarks || "No remarks"}</p>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    {isRowEditing ? (
                      <>
                        <Button
                          size="icon-sm"
                          onClick={() => handleSaveRow(row.requirement_id)}
                          disabled={updateProjectRequirement.isPending}
                        >
                          <Save className="w-4 h-4" />
                        </Button>

                        <Button
                          size="icon-sm"
                          variant="outline"
                          onClick={handleCancelRow}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon-sm"
                          variant="outline"
                          onClick={() => handleEditRow(row)}
                        >
                          <ListChecks className="w-4 h-4" />
                        </Button>

                        <UpdateRequirementForm
                          requirementId={row.requirement_id}
                          initialRequirement={row.requirement}
                        />

                        <DeleteRequirementButton id={row.requirement_id} />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
