"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import LOGO from "@/public/LOGO.png";
import Image from "next/image";
import { Footer } from "./footer";
import Link from "next/link";
import {
  ArrowLeftRight,
  Bell,
  FileText,
  Layers,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Items = [
  { name: "Dashboard", icon: <LayoutDashboard />, href: "/" },
  { name: "Transaction", icon: <ArrowLeftRight />, href: "/Transaction" },
  { name: "Projects", icon: <Layers />, href: "/Projects" },
  { name: "Reports", icon: <FileText />, href: "/Reports" },
  { name: "Notifications", icon: <Bell />, href: "/Notifications" },
  { name: "Settings", icon: <Settings />, href: "/Settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-4">
          <div className="h-10 aspect-square relative">
            <Image src={LOGO} alt="DOST" fill />
          </div>
          <div>
            <h1 className="font-bold text-sm">FUND TRACKER</h1>
            <p className="text-xs font-medium truncate max-w-40 text-muted-foreground">
              Provincial Science and Technology Offices
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
          {Items.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild className={`${isActive ? "bg-muted" : "text-muted-foreground"}`}>
                  <Link href={item.href} className="font-medium">
                    {item.icon}
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
