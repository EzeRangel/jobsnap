"use server";

import { getUserDTO } from "~/data/user/dto";
import { createClient } from "~/lib/supabase/server";

export const getUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  const { data: profile } = await supabase
    .from("UsersProfile")
    .select("*")
    .single();

  const user = getUserDTO(data.user, profile!);

  return user;
};
