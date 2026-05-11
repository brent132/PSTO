import { RequirementListProps } from "@/types/requirements";
import { useUpdateProjectRequirement } from "../hooks/use-update-project-requirement";
import { useState } from "react";

import { CheckIcon, ListChecks, MessageCircle, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import UpdateRequirementForm from "./update-requirement-form";
import DeleteRequirementButton from "./delete-requirement-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      {rows.map((row) => {
        const isRowEditing = editingRowId === row.requirement_id;

        return (
          <Card key={row.requirement_id} className="p-4">
            <div className="flex justify-between gap-2">
              <div className="w-full flex-2 flex flex-col gap-2">
                <p className="text-xs font-medium text-justify">
                  {row.requirement}
                </p>
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
                    placeholder="Enter remarks"
                  />
                ) : (
                  <div className="text-muted-foreground bg-muted flex items-center gap-2 p-2 rounded-sm">
                    <MessageCircle className="w-4 h-4" />
                    <p className="text-xs">{row.remarks || "No remarks"}</p>
                  </div>
                )}
              </div>
              <div className="w-full flex-1 flex flex-col gap-2">
                {isRowEditing ? (
                  <Select
                    value={draft.is_compiled ? "compiled" : "not_compiled"}
                    onValueChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        is_compiled: value === "compiled",
                      }))
                    }
                  >
                    <SelectTrigger className="text-xs" size="sm">
                      <SelectValue placeholder="select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compiled" className="text-xs">
                        Compiled
                      </SelectItem>
                      <SelectItem value="not_compiled" className="text-xs">
                        Not compiled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : row.is_compiled ? (
                  <Badge className="text-xs rounded-sm self-end">
                    Compiled
                  </Badge>
                ) : (
                  <Badge className="text-xs bg-destructive rounded-sm">
                    Not Compiled
                  </Badge>
                )}
                {isRowEditing ? (
                  <div className="flex gap-2">
                    <Button
                      size="icon-sm"
                      onClick={() => handleSaveRow(row.requirement_id)}
                      disabled={updateProjectRequirement.isPending}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={handleCancelRow}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
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
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
