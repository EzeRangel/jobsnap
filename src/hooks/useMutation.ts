"use client";

import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect, useState } from "react";
import { InferIn, SafeAction, Schema, ServerError } from "../types/SafeAction";

// TODO: Añadir más callbacks, por ej. onExecute
interface UseActionOption<T, E = ServerError> {
  onSuccess?: (result: T) => void;
  onError?: (error: E) => void;
  redirectOnSuccess?: string | { back: boolean };
  revalidateSWRKeys?: string[];
}

const useMutation = <InputSchema extends Schema, OutputData, E = ServerError>(
  action: SafeAction<InputSchema, OutputData>,
  option?: UseActionOption<OutputData, E>
) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [mutating, setMutating] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);
  // ! Si se va usar un useActionState no es necesario guardar el resultado en otro state.
  const [actionResult, setActionResult] = useState<OutputData>();
  const [state, formAction] = useActionState(action, {});
  // El input del cliente, si es de un formulario: FormData; si es un JSON el objeto parseado...
  const [clientInput, setClientInput] =
    useState<InputSchema extends Schema ? InferIn<InputSchema> : void>();

  useEffect(() => {
    const { result, error } = state as {
      result: OutputData | undefined;
      error: E | undefined;
    };
    if (result || error) {
      setMutating(false);
      if (error) {
        setHasErrored(true);
        option?.onError?.(error);
      } else if (result) {
        setActionResult(result);

        option?.onSuccess?.(result);
        if (option?.revalidateSWRKeys?.length) {
          option.revalidateSWRKeys.map((path) =>
            mutate(
              (key) => typeof key === "string" && key.startsWith(path),
              undefined,
              {
                revalidate: true,
              }
            )
          );
        }

        if (option?.redirectOnSuccess) {
          if (typeof option.redirectOnSuccess === "string") {
            router.replace(option.redirectOnSuccess);
          } else if (option.redirectOnSuccess?.back) {
            router.back();
          }
          router.refresh();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const reset = useCallback(() => {
    setMutating(false);
    setHasErrored(false);
    setClientInput(undefined);
    setActionResult(undefined);
  }, []);

  const formActionWrapper: typeof formAction = (payload) => {
    setTimeout(() => {
      setHasErrored(false);
      setClientInput(payload);
      setActionResult(undefined);
    }, 0);

    setMutating(true);

    return formAction(payload);
  };

  return {
    reset,
    hasErrored,
    mutating: mutating,
    result: actionResult,
    execute: formActionWrapper,
    input: clientInput as InputSchema extends Schema
      ? InferIn<InputSchema>
      : undefined,
  };
};

export default useMutation;
