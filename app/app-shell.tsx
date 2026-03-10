"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { BreadCrumbHeader } from "@/components/breadcrumb";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <BreadCrumbHeader />
        <div className="max-w-7xl mx-auto p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
