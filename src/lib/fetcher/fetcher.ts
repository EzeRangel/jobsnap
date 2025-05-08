import handleFetchResponse from "./handleFetchResponse";

export interface FetcherOpts
  extends Pick<RequestInit, "cache" | "next" | "method" | "headers"> {
  url: string;
  data?: any;
  refreshToken?: boolean;
}

export default async function fetcher<T>(
  urlOrOpts: FetcherOpts | string, // Para hacerlo compatible con la sintaxis de getAction
  opts: Partial<FetcherOpts> = {}
): Promise<T> {
  const url = typeof urlOrOpts === "string" ? urlOrOpts : urlOrOpts.url; // /api/user...
  const _opts = typeof urlOrOpts === "string" ? opts : urlOrOpts;
  const { data, ...options } = _opts;
  return handleFetchResponse<T>(
    await fetch(`${url}`, {
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  );
}
