import { FetcherError } from "./errors";

export interface APIResponse<T> {
  status: number;
  error: null | string;
  response: T;
}

/**
 * Obtiene el error de una respuesta HTTP.
 *
 * @param res Respuesta HTTP.
 * @returns Un nuevo error de tipo FetcherError.
 */
export async function getAsyncError(res: Response) {
  let data: Partial<APIResponse<unknown>> = {
    error: "Ocurrió un error inesperado",
  };

  try {
    data = await res.json();
  } catch (error) {
    data.error = (error as Error).message;
  }

  throw new FetcherError({
    message: data.error || "Error desconocido",
    status: res.status,
    statusText: res.statusText,
    validationErrors: [],
  });
}

/**
 * Maneja la respuesta HTTP y devuelve el contenido o lanza un error.
 *
 * @param res Respuesta HTTP.
 * @returns El contenido de la respuesta o lanza un error.
 */
const handleFetchResponse = async <R = unknown>(res: Response) => {
  if (res.ok) {
    const data: APIResponse<R> = await res.json();

    if (data.error) {
      throw new FetcherError({
        message: data.error,
        status: res.status,
        statusText: res.statusText,
        validationErrors: [],
      });
    }

    return data.response;
  }

  throw await getAsyncError(res);
};

export default handleFetchResponse;
