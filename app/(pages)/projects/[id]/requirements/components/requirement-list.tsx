"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRequirements } from "../hooks/use-fetch-requirements";

export default function RequirementList() {
  const { data: requirements, isLoading } = useRequirements();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-background">
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
          {requirements?.data.map((requirement) => (
            <TableRow key={requirement.id}>
              <TableCell>{requirement.requirement}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
