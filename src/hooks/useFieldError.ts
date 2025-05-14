import { useFormErrors } from "./useFormErrors";

export function useFieldError(field: string) {
  const { errors } = useFormErrors();
  return errors[field]?.[0] ?? null;
}
