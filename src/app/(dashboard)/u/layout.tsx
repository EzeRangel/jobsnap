import { ReactNode } from "react";
import { SiteHeader } from "~/components/site-header";

export default async function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="w-full">
      <SiteHeader title="Dashboard" />
      <section className="my-5 px-6">{children}</section>
    </main>
  );
}
