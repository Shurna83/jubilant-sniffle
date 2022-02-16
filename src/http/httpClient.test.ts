import axios from "axios";
import { Left, Right } from "../utils/either";
import { httpGet } from "./httpClient";

jest.mock("axios", () => ({
  get: jest.fn(),
  isAxiosError: jest.fn(),
}));

const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
const mockIsAxiosError = axios.isAxiosError as jest.MockedFunction<
  typeof axios.isAxiosError
>;

afterEach(() => {
  mockAxiosGet.mockReset();
});

describe("httpGet", () => {
  test("when invoked, then should make proper GET request", async () => {
    const url = "myFile.txt";
    mockAxiosGet.mockResolvedValueOnce({ data: "OK" });

    await httpGet<string>(url);

    expect(mockAxiosGet).toBeCalledTimes(1);
    expect(mockAxiosGet).toBeCalledWith(url);
  });

  test("when invoked, then should resolve with fetched data", async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: "OK" });

    await ensureRight("OK");
  });

  test("when GET request fails, then should resolve with proper error", async () => {
    mockIsAxiosError.mockReturnValueOnce(true);
    mockAxiosGet.mockRejectedValueOnce({ request: {} });

    await ensureLeft("No server response received so far");
  });

  test("when GET response fails, then should resolve with proper error", async () => {
    mockIsAxiosError.mockReturnValueOnce(true);
    mockAxiosGet.mockRejectedValueOnce({
      response: { status: "500", statusText: "Internal Server Error" },
    });

    await ensureLeft(
      `Server replied with error: status:'500'; statusText:'Internal Server Error'`
    );
  });

  test("when cannot detect axios error, then should resolve with proper error", async () => {
    mockIsAxiosError.mockReturnValueOnce(true);
    mockAxiosGet.mockRejectedValueOnce({});

    await ensureLeft(`Cannot parse Axios error`);
  });

  test("when GET fails with no axios error, then is resolved with error message", async () => {
    const errMsg = "An error msg";
    mockIsAxiosError.mockReturnValueOnce(false);
    mockAxiosGet.mockRejectedValueOnce({ message: errMsg });

    await ensureLeft(errMsg);
  });
});

function ensureLeft(msg: string): Promise<void> {
  return expect(httpGet("myUrl")).resolves.toEqual({
    value: msg,
    tag: "left",
  } as Left<string>);
}

function ensureRight(msg: string): Promise<void> {
  return expect(httpGet("myUrl")).resolves.toEqual({
    value: msg,
    tag: "right",
  } as Right<string>);
}
