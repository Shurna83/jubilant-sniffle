import { RecipeQuestion } from "../domain/definitions";
import { httpGet } from "../http/httpClient";
import { isLeft, isRight, left, right } from "../utils/either";
import { fetchQuestions } from "./apiClient";

jest.mock("../http/httpClient");
const mockHttpGet = httpGet as jest.MockedFunction<typeof httpGet>;

afterEach(() => {
  mockHttpGet.mockReset();
});

describe("fetchQuestions", () => {
  test("should make proper GET request", async () => {
    mockHttpGet.mockResolvedValueOnce(right("{}"));

    await fetchQuestions();

    expect(mockHttpGet).toBeCalledTimes(1);
    expect(mockHttpGet).toBeCalledWith("data.json");
  });

  test("should parse response data", async () => {
    const jsonQuestions = `[
    {
      "question": "q1",
      "answers": ["a11", "a12", "a13"],
      "correct": 0
    },
    {
      "question": "q2",
      "answers": ["a21", "a22", "a23"],
      "correct": 2
    }]`;
    mockHttpGet.mockResolvedValueOnce(right(jsonQuestions));

    const res = await fetchQuestions();

    expect(isRight(res)).toBeTruthy();
    expect(res.value).toStrictEqual([
      {
        question: "q1",
        answers: ["a11", "a12", "a13"],
        correctAnswerId: 0,
        domainId: "question",
      },
      {
        question: "q2",
        answers: ["a21", "a22", "a23"],
        correctAnswerId: 2,
        domainId: "question",
      },
    ] as RecipeQuestion[]);
  });

  test("when error parsing JSON, then should resolve with error", async () => {
    const jsonQuestions = `] invalid json [`;
    mockHttpGet.mockResolvedValueOnce(right(jsonQuestions));

    const res = await fetchQuestions();

    expect(isLeft(res)).toBeTruthy();
    expect(res.value).toBe("Cannot understand server response");
  });

  test("when httpGet fails, then error is propagated", async () => {
    const errMess = "An error";
    mockHttpGet.mockResolvedValueOnce(left(errMess));

    const res = await fetchQuestions();

    expect(isLeft(res)).toBeTruthy();
    expect(res.value).toBe(errMess);
  });
});
