"use client";
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ReportsHeader } from "./components/reports-header";
import { PreBuiltReports } from "./components/pre-built-reports";
import { CustomReports } from "./components/custom-reports";

export default function ReportsPage() {
  const [tab, setTab] = useState("pre-built-reports");

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <ReportsHeader tab={tab} onTabChange={setTab} />

      <TabsContent value="pre-built-reports">
        <PreBuiltReports />
      </TabsContent>
      <TabsContent value="custom-reports">
        <CustomReports />
      </TabsContent>
    </Tabs>
  );
}
