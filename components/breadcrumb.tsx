"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Link from "next/link";

const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
};

function formatSegment(segment: string) {
  return (
    labelMap[segment.toLowerCase()] ??
    segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function BreadCrumbHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const [projectTitle, setProjectTitle] = useState<string | null>(null);

  const projectId =
    segments[0] === "projects" && segments[1] ? segments[1] : null;

  useEffect(() => {
    if (!projectId) return;

    fetch(`/api/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => setProjectTitle(data.project_title))
      .catch(() => setProjectTitle(null));
  }, [projectId]);

  const items = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    let label = formatSegment(segment);

    if (index === 1 && projectTitle) {
      label = projectTitle;
    }

    return { href, label };
  });

  return (
    <Breadcrumb className="p-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathname === "/" ? (
            <BreadcrumbPage className="text-xs">Dashboard</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/" className="text-xs">
                Home
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div
              key={item.href}
              className="flex items-center text-xs capitalize"
            >
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
