import axios, { AxiosError } from "axios";
import { Either, left, right } from "../utils/either";

export async function httpGet<TResult>(
  url: string
): Promise<Either<string, TResult>> {
  try {
    const gino = await axios.get(url);
    const { data } = gino;
    return right(data as TResult);
  } catch (e) {
    return left(parseAxiosError(e));
  }
}

function parseAxiosError(err: unknown): string {
  const e = err as Error | AxiosError;
  if (!axios.isAxiosError(e)) {
    return e?.message;
  }
  return e.response
    ? `Server replied with error: status:'${e.response.status}'; statusText:'${e.response.statusText}'`
    : e.request
    ? `No server response received so far`
    : `Cannot parse Axios error`;
}
