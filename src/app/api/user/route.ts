import { NextResponse } from "next/server";
import { createClient } from "~/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return NextResponse.json({ response: user, error }, { status: 200 });
}
