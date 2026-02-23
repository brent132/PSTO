import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div>PSTO</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div>Group</div>
          <div>Group</div>
          <div>Group</div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div>Footer</div>
      </SidebarFooter>
    </Sidebar>
  )
}