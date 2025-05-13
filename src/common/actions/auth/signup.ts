"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { actionClient } from "~/lib/safe-action/create-action-client";
import { createClient } from "~/lib/supabase/server";

const schema = zfd.formData({
  email: zfd.text(
    z
      .string({ required_error: "Please type your email" })
      .email({ message: "Type a correct email" })
  ),
  password: zfd.text(z.string({ required_error: "Please type a password" })),
});

export const signup = actionClient.schema(schema).action(
  async ({ parsedInput }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp(parsedInput);

    if (error) {
      throw error;
    }

    return true;
  },
  {
    onSuccess() {
      redirect("/");
    },
  }
);
