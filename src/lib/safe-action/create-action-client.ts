import { SafeActionClientOpts } from "~/types/SafeAction";
// import { FetcherError } from "../fetcher/errors";
import { SafeActionClient } from "./safe-action-client";

export const DEFAULT_SERVER_ERROR_MESSAGE =
  "Ocurrió un problema al ejecutar la operación";

const createSafeActionClient = (opts?: SafeActionClientOpts) => {
  const handleServerError: SafeActionClientOpts["handleServerError"] =
    opts?.handleServerError ||
    ((e) => {
      console.error("Action error:", e);
      return {
        error: {
          message: DEFAULT_SERVER_ERROR_MESSAGE,
        },
      };
    });

  return new SafeActionClient({
    inputSchema: undefined,
    outputSchema: undefined,
    handleServerError,
  });
};

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    // * Aquí puede haber una función que registre errores.

    // if (e instanceof FetcherError) {
    //   return {
    //     error: {
    //       message: e.message,
    //       status: e.status,
    //     },
    //   };
    // }

    // Catch Supabase Errors

    if (e instanceof Error) {
      return {
        error: {
          message: e.message,
        },
      };
    }

    return {
      error: {
        message: DEFAULT_SERVER_ERROR_MESSAGE,
      },
    };
  },
});
