"use server";

import { actionClient } from "~/lib/safe-action/create-action-client";
import { uploadResumeSchema } from "./_schema";
import { createClient } from "~/lib/supabase/server";
import { getUser } from "~/common/actions/auth/user";

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

export const getUserCVs = actionClient.actionResult(async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("User not auth");

  const { data, error } = await supabase.storage
    .from("user-cvs")
    .list(`users/${user.id}`, {
      limit: 100,
      offset: 0,
    });

  if (error) throw error;

  return data;
});

export const getDownloadURL = async (filename: string) => {
  return actionClient.actionResult(async () => {
    const user = await getUser();

    if (!user) {
      throw new Error("User is not authenticated");
    }

    const supabase = await createClient();
    const path = `users/${user.id}/${filename}`;

    const { data, error } = await supabase.storage
      .from("user-cvs")
      .createSignedUrl(path, 60);
    if (error || !data?.signedUrl)
      throw error || new Error("Can not generate signed url");

    return data.signedUrl;
  })();
};
