"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { actionClient } from "~/lib/safe-action/create-action-client";
import { createClient } from "~/lib/supabase/server";

const schema = zfd.formData({
  first_name: zfd.text(z.string({ required_error: "Campo requerido" })),
  last_name: zfd.text(z.string({ required_error: "Campo requerido" })),
  email: zfd.text(
    z
      .string({ required_error: "Campo requerido" })
      .email("Escribe un email válido")
  ),
});

export const updateProfile = actionClient.schema(schema).action(
  async ({ parsedInput }) => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { first_name, last_name } = parsedInput;

    const { data: profile, error } = await supabase
      .from("UsersProfile")
      .upsert(
        { first_name, last_name, user_id: user!.id },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (error) {
      throw error;
    }

    return profile;
  },
  { revalidate: { paths: ["/settings"] } }
);
