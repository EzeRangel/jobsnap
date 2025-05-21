"use client";

import { useState } from "react";
import FileUpload from "~/components/forms/file-upload";
import { FormField } from "~/components/forms/form-field";
import Submit from "~/components/forms/submit";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { FormProvider } from "~/context/form-context";
import useAuthUser from "~/hooks/useAuthUser";
import { useFormErrors } from "~/hooks/useFormErrors";
import useMutation from "~/hooks/useMutation";
import { createClient } from "~/lib/supabase/client";
import { uploadResume } from "../_actions";
import { toast } from "sonner";

export function UploadResume() {
  return (
    <section className="grid grid-cols-12 gap-6">
      <aside className="col-span-3 space-y-3">
        <h2 className="text-xl/normal font-bold text-foreground">
          Upload a new resume
        </h2>
        <p className="text-muted-foreground">
          Upload and save the information of your resume for using it later
        </p>
      </aside>
      <Card className="col-span-9">
        <CardContent>
          <FormProvider>
            <Form />
          </FormProvider>
        </CardContent>
      </Card>
    </section>
  );
}

function Form() {
  const { user } = useAuthUser();
  const { setErrors } = useFormErrors();
  const [fullPath, setFullPath] = useState("");
  const { execute } = useMutation(uploadResume, {
    onError(error) {
      const title = "An error prevented the form to be submitted";
      const message = error.message || "There was an error";

      if (error.validationErrors) {
        setErrors(error.validationErrors);
      }

      toast.error(title, { description: message });
    },
    onSuccess({ message }) {
      toast.success(message);
    },
  });

  const handleUpload = async (file: File) => {
    if (user) {
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from("user-cvs")
        .upload(`/temp/${user?.id}/${file.name}`, file);

      if (error) {
        setErrors({ file: [error.message] });
      } else {
        setFullPath(data.fullPath);
      }
    }
  };

  return (
    <form action={execute} className="space-y-3">
      <input type="hidden" name="fullPath" value={fullPath} />
      <FormField
        label="Name"
        name="filename"
        hint="Useful for version tracking"
      >
        {() => <Input id="filename" name="filename" placeholder="Master_CV" />}
      </FormField>
      <FormField name="file">
        {() => (
          <FileUpload
            uploadMode="single"
            otherText="(PDF, DOC, DOCX up to 5MB)"
            maxSize={5 * 1024 * 1024}
            onFilesUploaded={handleUpload}
          />
        )}
      </FormField>
      <Submit>Save Resume</Submit>
    </form>
  );
}
