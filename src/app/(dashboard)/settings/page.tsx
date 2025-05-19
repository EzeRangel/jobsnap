import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { fetchUserProfile } from "~/data/user";
import ProfileForm from "./_components/profile-form";

const getData = async () => {
  const [user] = await Promise.all([fetchUserProfile()]);

  return {
    user,
  };
};

export default async function AccountPage() {
  const { user } = await getData();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm user={user} />
        </CardContent>
      </Card>
    </>
  );
}
