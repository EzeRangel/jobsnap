import { ReactNode } from "react";
import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { useFormErrors } from "~/hooks/useFormErrors";

type FunctionProps = {
  fieldError?: string[];
};
type FunctionChild = (params: FunctionProps) => ReactNode;

interface Props {
  name: string;
  label?: string;
  className?: string;
  children: FunctionChild;
  hint?: string;
}

export function FormField({ name, label, hint, children, className }: Props) {
  const { errors } = useFormErrors();
  const hasError = !!errors?.[name]?.[0];
  const fieldError = errors?.[name];

  return (
    <div className={cn(className)}>
      {label ? <Label htmlFor={name}>{label}</Label> : null}
      <div>
        {children({ fieldError })}
        {hasError ? (
          <span className="block text-xs/6 text-destructive">
            {errors[name][0]}
          </span>
        ) : hint !== undefined ? (
          <span className="block text-xs/tight text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </div>
    </div>
  );
}
