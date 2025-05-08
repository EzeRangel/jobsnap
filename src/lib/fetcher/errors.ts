export type ErrorData = {
  message: string;
  code?: string;
};

export type ErrorResponse = {
  status: number;
  message?: string; // Actualmente las respuestas del API no regresan esto. En su lugar llega en el atributo `error`
  statusText: string;
  validationErrors?: Array<{ property: string; message: string }>;
};

export class FetcherError extends Error {
  public statusText: string;
  public status: number;
  public validationErrors: ErrorResponse["validationErrors"];

  constructor({
    message,
    status,
    statusText,
    validationErrors,
  }: ErrorResponse) {
    super(message);
    this.name = "FetcherError";
    this.status = status;
    this.statusText = statusText;
    this.validationErrors = validationErrors;
    // Corrige el stack trace en entornos de JavaScript modernos
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      // Fallback para entornos más antiguos
      this.stack = new Error(message).stack;
    }
  }
}
