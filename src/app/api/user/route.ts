import { NextResponse } from "next/server";
import { getUserDTO } from "~/data/user/dto";
import { createClient } from "~/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error }, { status: error.status });
  }

  const { data: profile, error: err } = await supabase
    .from("UsersProfile")
    .select("*")
    .single();

  const user = getUserDTO(data.user, profile!);

  return NextResponse.json({ response: user, error: err }, { status: 200 });
}
