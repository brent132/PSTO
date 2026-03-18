"use client";
import { useState } from "react";
import { ProjectHeader } from "./components/project-header";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProjectsListView } from "./components/projects-list-view";
import { ProjectsTableView } from "./components/projects-table-view";

export default function ProjectsPage() {
  const [tab, setTab] = useState("list");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <Tabs value={tab} onValueChange={setTab} className="flex flex-col">
      <ProjectHeader
        tab={tab}
        onTabChange={setTab}
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <TabsContent value="list">
        <ProjectsListView search={search} status={status} />
      </TabsContent>
      <TabsContent value="table">
        <ProjectsTableView search={search} status={status} />
      </TabsContent>
    </Tabs>
  );
}
