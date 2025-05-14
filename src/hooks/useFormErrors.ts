import { useContext } from "react";
import { FormContext } from "~/context/form-context";

export function useFormErrors() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormErrors must be used within FormProvider");
  return ctx;
}
