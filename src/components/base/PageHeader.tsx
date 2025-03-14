"use client";

import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ModeToggle } from "@/components/base/Sidebar/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface PathSegment {
  name: string;
  href: string;
}

export function PageHeader() {
  const pathname = usePathname();

  // Generate breadcrumb items based on the current path
  const getBreadcrumbs = (): PathSegment[] => {
    // Skip the first empty string
    const segments = pathname.split("/").filter(Boolean);

    // Create breadcrumb segments with proper href paths
    return segments.map((segment, index) => {
      // Build the href path for this segment
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      // Format the display name (capitalize first letter)
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);

      return { name, href };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-6 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.href}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-2 ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
