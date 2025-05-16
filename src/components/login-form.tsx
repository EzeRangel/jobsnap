"use client";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import useMutation from "~/hooks/useMutation";
import { login } from "~/common/actions/auth/login";
import { FormProvider } from "~/context/form-context";
import { useFormErrors } from "~/hooks/useFormErrors";
import { toast } from "sonner";
import { FormField } from "./forms/form-field";

export function LoginForm() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}

function Form({ className, ...props }: React.ComponentProps<"div">) {
  const { setErrors, clearErrors } = useFormErrors();
  const { execute } = useMutation(login, {
    onError(error) {
      const title = error.message || "There was an error";
      let message = "An error prevented the form to be submitted";

      if (error.validationErrors) {
        setErrors?.(error.validationErrors);
        const fields = Object.keys(error.validationErrors);
        const messages = fields.flatMap((field) => {
          return error?.validationErrors?.[field] ?? [];
        });

        message = messages.join(", ");
      } else {
        clearErrors?.();
      }

      toast.error(title, { description: message });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={execute}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <FormField
                  name="email"
                  label="Email"
                  className="flex flex-col gap-3"
                >
                  {({ fieldError }) => (
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                      aria-invalid={!!fieldError?.[0]}
                      aria-describedby="email-error"
                    />
                  )}
                </FormField>
                <FormField
                  name="password"
                  label="Password"
                  className="flex flex-col gap-3"
                >
                  {({ fieldError }) => (
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                      aria-invalid={!!fieldError?.[0]}
                      aria-describedby="password-error"
                    />
                  )}
                </FormField>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
