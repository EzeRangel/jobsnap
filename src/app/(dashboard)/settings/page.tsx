import {
  BellDotIcon,
  MonitorCheckIcon,
  PaletteIcon,
  UserIcon,
  WrenchIcon,
} from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { fetchUserProfile } from "~/data/user";
import ProfileForm from "./_components/profile-form";

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
  {
    title: "Appearance",
    icon: <PaletteIcon size={18} />,
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    icon: <BellDotIcon size={18} />,
    href: "/settings/notifications",
  },
  {
    title: "Display",
    icon: <MonitorCheckIcon size={18} />,
    href: "/settings/display",
  },
];

const getData = async () => {
  const [userProfile] = await Promise.all([fetchUserProfile()]);

  return {
    userProfile,
  };
};

export default async function AccountPage() {
  const { userProfile } = await getData();

  return (
    <main className="w-full">
      <SiteHeader title="Settings" />
      <section className="my-10 px-6 grid grid-cols-12 gap-6">
        <div className="border-b border-border pb-3 col-span-12">
          <h1 className="text-3xl/normal font-bold text-foreground">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <aside className="col-span-2">
          <nav
            className={cn(
              "flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0"
            )}
          >
            {ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  // pathname === item.href
                  //   ? "bg-muted hover:bg-muted"
                  //:
                  "hover:bg-transparent hover:underline",
                  "justify-start"
                )}
              >
                <span className="mr-2">{item.icon}</span>
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="col-start-4 col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                This is how others will see you on the site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm profile={userProfile} />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
