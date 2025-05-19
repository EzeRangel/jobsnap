import { SiteHeader } from "~/components/site-header";

export default async function AccountPage() {
  return (
    <main className="w-full">
      <SiteHeader title="Settings" />
      <section className="my-10 px-6">
        <div className="border-b border-border pb-6">
          <h1 className="text-3xl/relaxed font-bold text-foreground">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
      </section>
    </main>
  );
}
