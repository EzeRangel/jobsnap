"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface LinkItem {
  title: string;
  icon: JSX.Element;
  href: string;
}

interface Props {
  links: LinkItem[];
}

export function LayoutNavigation({ links }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0"
      )}
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          <span className="mr-2">{item.icon}</span>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
