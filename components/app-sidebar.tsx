import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import LOGO from "@/public/LOGO.png";
import Image from "next/image";
import { Footer } from "./footer";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-4">
          <div className="h-10 aspect-square relative">
            <Image src={LOGO} alt="DOST" fill />
          </div>
          <div>
            <h1 className="font-bold text-sm">FUND TRACKER</h1>
            <p className="text-xs font-medium truncate max-w-40 text-muted-foreground">Provincial Science and Technology Offices</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Footer/>
      </SidebarFooter>
    </Sidebar>
  );
}
