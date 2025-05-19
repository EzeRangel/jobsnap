"use client";

import { usePathname } from "next/navigation";

const HEADER_ITEMS = [
  {
    title: "Settings",
    pathname: "/settings",
    description: "Manage your account settings and set e-mail preferences.",
  },
  {
    title: "Account",
    pathname: "/settings/account",
    description:
      "Update your account settings. Set your preferred language and timezone.",
  },
];

export function LayoutHeader() {
  const pathname = usePathname();
  const currentHeaderItem = HEADER_ITEMS.find(
    (item) => item.pathname === pathname
  );

  return (
    <header className="border-b border-border pb-3 col-span-12">
      <h1 className="text-3xl/normal font-bold text-foreground">
        {currentHeaderItem!.title}
      </h1>
      <p className="text-lg text-muted-foreground">
        {currentHeaderItem!.description}
      </p>
    </header>
  );
}
