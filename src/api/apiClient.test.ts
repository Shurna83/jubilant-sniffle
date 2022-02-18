import { httpGet } from "../http/httpClient";
import { isLeft, isRight, left, right } from "../utils/either";
import {
  getTwoQuestions,
  getTwoRawQuestions,
} from "../__test__/utils/fakeData";
import { fetchQuestions } from "./apiClient";

jest.mock("../http/httpClient");
const mockHttpGet = httpGet as jest.MockedFunction<typeof httpGet>;

describe("fetchQuestions", () => {
  test("should make proper GET request", async () => {
    mockHttpGet.mockResolvedValueOnce(right({}));

    await fetchQuestions();

    expect(mockHttpGet).toBeCalledTimes(1);
    expect(mockHttpGet).toBeCalledWith("data.json");
  });

  test("should parse response data", async () => {
    const rawQuestions = getTwoRawQuestions();
    mockHttpGet.mockResolvedValueOnce(right(rawQuestions));

    const res = await fetchQuestions();

    expect(isRight(res)).toBeTruthy();
    expect(res.value).toStrictEqual(getTwoQuestions());
  });

  test("when httpGet fails, then error is propagated", async () => {
    const errMess = "An error";
    mockHttpGet.mockResolvedValueOnce(left(errMess));

    const res = await fetchQuestions();

    expect(isLeft(res)).toBeTruthy();
    expect(res.value).toBe(errMess);
  });

  test("when malformed data, then should propagate error", async () => {
    mockHttpGet.mockResolvedValueOnce(right({}));

    const res = await fetchQuestions();

    expect(isLeft(res)).toBeTruthy();
    expect(
      (res.value as string).startsWith(`Cannot understand server response:`)
    ).toBe(true);
  });
});
