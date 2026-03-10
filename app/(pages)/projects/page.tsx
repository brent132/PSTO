import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Projects } from "./components/projects";
import { AddNewProject } from "./components/add-new-project";

export default function ProjectsPage() {
  return (
    <div>
      <Tabs defaultValue="Projects">
        <TabsList className="border">
          <TabsTrigger value="Projects">Projects</TabsTrigger>
          <TabsTrigger value="Add-new-project">Add new project</TabsTrigger>
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
