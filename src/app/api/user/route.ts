import { NextResponse } from "next/server";
import { getUserDTO } from "~/data/user/dto";
import { createClient } from "~/lib/supabase/server";
import { UserProfile } from "~/types/UserProfile";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error }, { status: error.status });
  }

  const { data: profile, error: err } = await supabase
    .from("UsersProfile")
    .select("*")
    .single()
    .overrideTypes<UserProfile, { merge: false }>();

  const user = getUserDTO(data.user, profile!);

  return NextResponse.json({ response: user, error: err }, { status: 200 });
}
