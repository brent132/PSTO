"use client";
import { useState } from "react";
import { ProjectsHeader } from "./components/projects-header";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProjectsListView } from "./components/projects-list-view";
import { ProjectsTableView } from "./components/projects-table-view";

export default function ProjectsPage() {
  const [tab, setTab] = useState("list");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [fiscalYear, setFiscalYear] = useState("all");

  return (
    <Tabs value={tab} onValueChange={setTab} className="flex flex-col">
      <ProjectsHeader
        tab={tab}
        onTabChange={setTab}
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        fiscalYear={fiscalYear}
        onFiscalYearChange={setFiscalYear}
      />

      <TabsContent value="list">
        <ProjectsListView
          search={search}
          status={status}
          fiscalYear={fiscalYear}
        />
      </TabsContent>
      <TabsContent value="table">
        <ProjectsTableView
          search={search}
          status={status}
          fiscalYear={fiscalYear}
        />
      </TabsContent>
    </Tabs>
  );
}
