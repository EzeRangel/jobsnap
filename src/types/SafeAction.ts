import { z } from "zod";
import { MaybePromise } from "./Utils";

export type Schema = z.ZodType;

// El payload parseado
export type Infer<S extends Schema> = z.infer<S>;

// El payload tal como lo envió el cliente
export type InferIn<S extends Schema> = z.input<S>;

export type GetAction<Data> = () => Promise<Data>;

export type ServerAction<S extends Schema | undefined, Data> = (args: {
  parsedInput: S extends Schema ? Infer<S> : undefined;
  clientInput: S extends Schema ? InferIn<S> : undefined;
}) => Promise<Data>;

export interface SafeActionResponse<Data> {
  result?: Data;
  id?: number;
  error?: unknown;
}

export interface ServerError {
  message?: string;
  status?: number;
  validationErrors?: Record<string, string[]>;
}

export interface SafeActionError<E> {
  result?: undefined;
  id?: number;
  error: E;
}

export type SafeAction<Input extends Schema | undefined, Output> = (
  _: unknown,
  input: Input extends Schema ? InferIn<Input> : undefined
) => Promise<SafeActionResponse<Output>>;

export type SafeActionClientOpts<E = SafeActionError<ServerError>> = {
  handleServerError?: (error: Error) => MaybePromise<E>;
  throwValidationErrors?: boolean;
};
