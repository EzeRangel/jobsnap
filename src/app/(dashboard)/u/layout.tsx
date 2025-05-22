import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getUser } from "~/common/actions/auth/user";
import { SiteHeader } from "~/components/site-header";

export default async function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="w-full">
      <SiteHeader title="Dashboard" />
      <section className="my-5 px-6">{children}</section>
    </main>
  );
}
