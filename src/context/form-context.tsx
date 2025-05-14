import React, { createContext, useState } from "react";

type FormErrors = Record<string, string[]>;

interface FormContextValue {
  errors: FormErrors;
  setErrors: (errors: FormErrors) => void;
  clearErrors: () => void;
}

export const FormContext = createContext<FormContextValue | undefined>(
  undefined
);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [errors, setErrorsState] = useState<FormErrors>({});

  const setErrors = (errs: FormErrors) => setErrorsState(errs);
  const clearErrors = () => setErrorsState({});

  return (
    <FormContext.Provider value={{ errors, setErrors, clearErrors }}>
      {children}
    </FormContext.Provider>
  );
}
