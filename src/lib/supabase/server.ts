import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "~/common/constants";
import { Database } from "~/types/supabase";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookies) {
        try {
          cookies.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}
