"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MainNavbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: "HomePage",
      active: pathname === `/`,
    },
    {
      href: `/categories`,
      label: "Categories",
      active: pathname.startsWith(`/categories`),
    },
    {
      href: `/products`,
      label: "Products",
      active: pathname.startsWith(`/products`),
    },
  ];
  return (
    <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          className={cn(
            "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-600 ",
            route.active ? "text-black dark:text-white" : "text-slate-500"
          )}
          key={route.href}
          href={route.href}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}

export default MainNavbar;
