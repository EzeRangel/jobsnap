"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { actionClient } from "~/lib/safe-action/create-action-client";
import { createClient } from "~/lib/supabase/server";

const schema = zfd
  .formData({
    email: zfd.text(
      z
        .string({ required_error: "Please type your email" })
        .email({ message: "Type a correct email" })
    ),
    password: zfd.text(
      z
        .string({ required_error: "Please type a password" })
        .min(8, "Password should have at least 8 characters")
    ),
    passwordConfirm: zfd.text(
      z
        .string({
          required_error: "Please confirm your password",
        })
        .min(8, "Password should have at least 8 characters")
    ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export const signup = actionClient.schema(schema).action(
  async ({ parsedInput }) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp(parsedInput);

    if (error) {
      throw error;
    }

    if (data.user) {
      await supabase
        .from("UsersProfile")
        .insert({ user_id: data.user.id, first_name: null, last_name: null });
    }

    return true;
  },
  {
    onSuccess() {
      redirect("/");
    },
  }
);
