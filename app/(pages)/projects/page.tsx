import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Projects } from "./components/projects";
import { AddNewProject } from "./components/add-new-project";
import { Layers, LayersPlus } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div>
      <Tabs defaultValue="Projects">
        <TabsList className="border">
          <TabsTrigger value="Projects">
            <Layers />
            Projects
          </TabsTrigger>
          <TabsTrigger value="Add-new-project">
            <LayersPlus />
            Add new project
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Projects">
          <Projects />
        </TabsContent>
        <TabsContent value="Add-new-project">
          <AddNewProject />
        </TabsContent>
      </Tabs>
    </div>
  );
}
