"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return error;
  } else {
    redirect("/");
  }
}
