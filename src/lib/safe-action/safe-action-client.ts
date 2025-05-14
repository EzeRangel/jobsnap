import { z } from "zod";
import {
  GetAction,
  Infer,
  InferIn,
  SafeAction,
  SafeActionClientOpts,
  SafeActionResponse,
  Schema,
  ServerAction,
} from "~/types/SafeAction";
import { revalidatePath, revalidateTag } from "next/cache";
import { DEFAULT_SERVER_ERROR_MESSAGE } from "./create-action-client";

export class SafeActionClient<
  ServerError,
  IS extends Schema | undefined,
  OS extends Schema | undefined
> {
  readonly #inputSchema: IS;
  readonly #outputSchema: OS;
  readonly #handleServerError: NonNullable<
    SafeActionClientOpts<ServerError>["handleServerError"]
  >;

  constructor(
    opts: {
      inputSchema: IS;
      outputSchema: OS;
    } & Required<Pick<SafeActionClientOpts<ServerError>, "handleServerError">>
  ) {
    this.#inputSchema = (opts.inputSchema ?? undefined) as IS;
    this.#outputSchema = (opts.outputSchema ?? undefined) as OS;
    this.#handleServerError = opts.handleServerError;
  }

  schema<S extends z.ZodType>(inputSchema: S) {
    return new SafeActionClient({
      inputSchema: inputSchema,
      outputSchema: this.#outputSchema,
      handleServerError: this.#handleServerError,
    });
  }

  output<S extends z.ZodType>(outputSchema: S) {
    return new SafeActionClient({
      outputSchema: outputSchema,
      inputSchema: this.#inputSchema,
      handleServerError: this.#handleServerError,
    });
  }

  private async validate<S extends z.ZodType>(schema: S, data: unknown) {
    const result = await schema.safeParseAsync(data);

    if (result.success) {
      return {
        success: true,
        data: result.data as Infer<S>,
      } as const;
    }

    return {
      success: false,
      issues: result.error.issues.map(({ message, path }) => ({
        message,
        path,
      })),
    } as const;
  }

  actionResult<Data extends OS extends Schema ? Infer<OS> : unknown>(
    handler: GetAction<Data>
  ) {
    return async () => {
      const outputSchema = this.#outputSchema;
      const handleServerError = this.#handleServerError;

      try {
        const result = await handler();

        if (typeof outputSchema !== "undefined") {
          const parsedData = await this.validate(outputSchema, result);

          if (!parsedData.success) {
            console.error(parsedData.issues);
            throw new Error("La data regresada no tiene un esquema correcto.");
          }
        }

        return result;
      } catch (err: unknown) {
        const error =
          err instanceof Error ? err : new Error(DEFAULT_SERVER_ERROR_MESSAGE);

        const returnedError = await handleServerError(error);

        return returnedError as Data;
      }
    };
  }

  action<Data extends OS extends Schema ? Infer<OS> : unknown>(
    handler: ServerAction<IS, Data>,
    opts?: {
      revalidate?: { tags?: string[]; paths?: string[] };
      onSuccess?: (result?: Data) => Promise<void>;
    }
  ): SafeAction<IS, Data> {
    return async (...clientInputs: unknown[]) => {
      const clientInput = clientInputs.at(-1);
      const inputSchema = this.#inputSchema;
      const outputSchema = this.#outputSchema;
      const handleServerError = this.#handleServerError;

      if (typeof inputSchema === "undefined") {
        return {
          error: {
            message:
              "SafeActionClient config error. There's no input schema defined.",
          },
        };
      }

      let safeHandlerArgs;
      const actionResult: SafeActionResponse<Data> = {};
      const callbackPromises: (Promise<unknown> | undefined)[] = [];

      try {
        const validationResults = await this.validate(inputSchema, clientInput);

        if (validationResults.success) {
          safeHandlerArgs = {
            parsedInput: validationResults.data as IS extends Schema
              ? Infer<IS>
              : undefined,
            clientInput: clientInput as IS extends Schema
              ? InferIn<IS>
              : undefined,
          };

          const result = await handler(safeHandlerArgs);

          if (typeof outputSchema !== "undefined") {
            const parsedData = await this.validate(outputSchema, result);

            if (!parsedData.success) {
              throw new Error("Output data has incorrect schema");
            }
          }

          if (opts?.revalidate) {
            const { tags, paths } = opts.revalidate;
            tags?.forEach?.((tag) => revalidateTag(tag));
            paths?.forEach?.((path) => revalidatePath(path));
          }

          actionResult.result = result;
        } else {
          // Errores de validación: No es un ServerError
          // TODO: Puede ser posible crear una clase para manejar estos errores
          return {
            error: {
              message: "Validation errors",
              // prettier-ignore
              validationErrors: validationResults.issues.reduce<Record<string, string[]>>((acc, item) => {
                const { path, message } = item;
                const fieldName = path.join(".");

                acc[fieldName] = acc[fieldName] || [];
                acc[fieldName].push(message);
                return acc;
              }, {}),
            },
          };
        }
      } catch (err: unknown) {
        const error =
          err instanceof Error ? err : new Error(DEFAULT_SERVER_ERROR_MESSAGE);

        const returnedError = await handleServerError(error);

        return returnedError as Data;
      }

      if (typeof actionResult.result !== "undefined") {
        callbackPromises.push(opts?.onSuccess?.(actionResult.result));
      }

      await Promise.all(callbackPromises);
      return actionResult;
    };
  }
}
