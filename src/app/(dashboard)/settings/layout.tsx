import { UserIcon, WrenchIcon } from "lucide-react";
import { ReactNode } from "react";
import { SiteHeader } from "~/components/site-header";
import { LayoutHeader } from "./_components/layout-header";
import { LayoutNavigation } from "./_components/layout-navigation";

const ITEMS = [
  {
    title: "Profile",
    icon: <UserIcon size={18} />,
    href: "/settings",
  },
  {
    title: "Account",
    icon: <WrenchIcon size={18} />,
    href: "/settings/account",
  },
];

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="w-full">
      <SiteHeader title="Settings" />
      <section className="my-10 px-6 grid grid-cols-12 gap-6">
        <LayoutHeader />
        <aside className="col-span-2">
          <LayoutNavigation links={ITEMS} />
        </aside>
        <div className="col-start-3 col-span-9">{children}</div>
      </section>
    </main>
  );
}
