"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
} from "lucide-react";
import { usePathname } from "next/navigation";
import { HandleItemClick } from "@/hooks/handle-item-click";

export const SideItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Transaction", icon: ArrowLeftRight, href: "/transactions" },
  { name: "Projects", icon: Layers, href: "/projects" },
  { name: "Reports", icon: FileText, href: "/reports" },
  { name: "Notifications", icon: Bell, href: "/notifications" },
];

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4">
          <div className="flex items-center gap-4 border-b py-6">
            <div className="h-10 aspect-square relative">
              <Image src={LOGO} alt="DOST" fill />
            </div>
            <div>
              <h1 className="font-bold text-sm">FUND TRACKER</h1>
              <p className="text-xs truncate max-w-40 sm:max-w-40 text-muted-foreground">
                Provincial Science and Technology Offices
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu className="gap-2">
          {SideItems.map((item, index) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));

            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className={`${isActive ? "bg-primary text-brand-foreground hover:bg-primary hover:text-brand-foreground" : "text-muted-foreground"}`}
                >
                  <Link
                    href={item.href}
                    className="h-10 text-xs"
                    onClick={() => HandleItemClick(isMobile, setOpenMobile)}
                  >
                    <Icon className="w-4 h-4" />
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
