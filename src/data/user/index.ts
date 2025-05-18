import { createClient } from "~/lib/supabase/server";

export async function fetchUserProfile() {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("UsersProfile")
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return profile;
}
