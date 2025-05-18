import { createClient } from "~/lib/supabase/server";
import { UserProfile } from "~/types/UserProfile";
import { getUserDTO } from "./dto";

export async function fetchUserProfile() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  const { data: profile } = await supabase
    .from("UsersProfile")
    .select("*")
    .single()
    .overrideTypes<UserProfile, { merge: false }>();

  const user = getUserDTO(data.user, profile!);

  return user;
}
