import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Textarea } from "@/components/ui/textarea";
import { RequirementListProps } from "@/types/requirements";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X } from "lucide-react";

export default function RequirementList({
  rows,
  isLoading,
  isEditing,
  onUpdateRow,
}: RequirementListProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Requirement</TableHead>
            <TableHead>Compiled</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.requirement_id}>
              <TableCell className="">{row.requirement}</TableCell>

              <TableCell>
                {isEditing ? (
                  <Checkbox
                    checked={row.is_compiled}
                    onCheckedChange={(checked) =>
                      onUpdateRow(
                        row.requirement_id,
                        "is_compiled",
                        checked === true,
                      )
                    }
                  />
                ) : row.is_compiled ? (
                  <Check className="w-8 h-8 text-primary" />
                ) : (
                  <X className="w-8 h-8 text-destructive" />
                )}
              </TableCell>

              <TableCell className="">
                {isEditing ? (
                  <Textarea
                    value={row.remarks ?? ""}
                    className="w-full text-sm"
                    onChange={(e) =>
                      onUpdateRow(row.requirement_id, "remarks", e.target.value)
                    }
                  />
                ) : (
                  <p>{row.remarks || "No remarks"}</p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
