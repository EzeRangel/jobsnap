"use server";

import { actionClient } from "~/lib/safe-action/create-action-client";
import { uploadResumeSchema } from "./_schema";
import { createClient } from "~/lib/supabase/server";

export const uploadResume = actionClient
  .schema(uploadResumeSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Only authenticated users can upload CVs");
    }

    const { filename, fullPath } = parsedInput;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [bucket, temp, userId, name] = fullPath.split("/");

    if (!name) {
      throw new Error("Can not move the uploaded file");
    }

    const storageRef = `/users/${user.id}/${name}`;

    const { error } = await supabase
      .from("CVS")
      .insert({ filename, raw_file_url: storageRef });

    if (error) {
      throw error;
    }

    await supabase.storage
      .from("user-cvs")
      .copy(`temp/${user.id}/${name}`, `users/${user.id}/${name}`);

    return { message: "Your CV has been saved correctly" };
  });
