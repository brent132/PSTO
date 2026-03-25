"use client";
import { useState } from "react";
import { ProjectsHeader } from "./components/projects-header";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProjectsListView } from "./components/projects-list-view";
import { ProjectsTableView } from "./components/projects-table-view";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProjectsPage() {
  const [tab, setTab] = useState("list");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const status = searchParams.get("status") ?? "all";
  const fiscalYear = searchParams.get("fiscal_year") ?? "all";

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <Tabs value={tab} onValueChange={setTab} className="flex flex-col">
      <ProjectsHeader
        tab={tab}
        onTabChange={setTab}
        search={search}
        onSearchChange={(value) => updateParams({ q: value })}
        status={status}
        onStatusChange={(value) => updateParams({ status: value })}
        fiscalYear={fiscalYear}
        onFiscalYearChange={(value) => updateParams({ fiscal_year: value })}
      />

      <TabsContent value="list">
        <ProjectsListView />
      </TabsContent>
      <TabsContent value="table">
        <ProjectsTableView />
      </TabsContent>
    </Tabs>
  );
}
