"use client";

import { toast } from "sonner";
import { FormField } from "~/components/forms/form-field";
import Submit from "~/components/forms/submit";
import { Input } from "~/components/ui/input";
import { FormProvider } from "~/context/form-context";
import { updateProfile } from "~/data/user/actions";
import { useFormErrors } from "~/hooks/useFormErrors";
import useMutation from "~/hooks/useMutation";
import { UserProfile } from "~/types/UserProfile";

interface Props {
  profile: UserProfile;
}

export default function ProfileForm(props: Props) {
  return (
    <FormProvider>
      <Form {...props} />
    </FormProvider>
  );
}

function Form({ profile }: Props) {
  const { setErrors } = useFormErrors();
  const { execute } = useMutation(updateProfile, {
    onError(error) {
      if (error.validationErrors) {
        setErrors(error.validationErrors);
      }

      toast.error(error.message);
    },
    onSuccess() {
      toast.success("Tu perfil ha sido actualizado");
    },
  });

  return (
    <form action={execute} className="grid gap-4">
      <FormField label="First Name" name="first_name">
        {({ fieldError }) => (
          <Input
            id="first_name"
            name="first_name"
            defaultValue={profile.first_name}
            aria-invalid={!!fieldError?.[0]}
            aria-describedby="first-name-error"
          />
        )}
      </FormField>
      <FormField label="Last Name" name="last_name">
        {({ fieldError }) => (
          <Input
            id="last_name"
            name="last_name"
            defaultValue={profile.last_name}
            aria-invalid={!!fieldError?.[0]}
            aria-describedby="last-name-error"
          />
        )}
      </FormField>
      <FormField
        label="Email"
        name="email"
        hint="You can manage verified email addresses in your email settings."
      >
        {() => <Input id="email" name="email" type="email" />}
      </FormField>
      <div>
        <Submit>Update profile</Submit>
      </div>
    </form>
  );
}
