import { reaction } from "mobx";
import { fetchQuestions } from "../api/apiClient";
import { RecipeQuestion } from "../domain/definitions";
import { left, right } from "../utils/either";
import { getTwoQuestions } from "../__test__/utils/fakeData";
import { IErrorStore } from "./errorsStore";
import { IRecipeStore, newRecipeStore } from "./recipeStore";

jest.mock("../api/apiClient");
const mockFetchQuestions = fetchQuestions as jest.MockedFunction<
  typeof fetchQuestions
>;

afterEach(() => {
  mockFetchQuestions.mockReset();
});

describe("start", () => {
  test("when started, then fetches questions", async () => {
    mockFetchQuestions.mockResolvedValueOnce(right([]));
    const { recipeStore } = createStores();

    await recipeStore.start();

    expect(mockFetchQuestions).toBeCalledTimes(1);
  });

  test("when fetch succeeds, then results are recomputed by MobX", async () => {
    const questions = getTwoQuestions();
    mockFetchQuestions.mockResolvedValueOnce(right(questions));
    const { recipeStore } = createStores();
    let res: RecipeQuestion[] = [];
    reaction(
      () => recipeStore.questions,
      (qs) => {
        res = qs;
      }
    );

    await recipeStore.start();

    expect(res).toStrictEqual(questions);
  });

  test("when fetch fails, then error is set into error store", async () => {
    const errMsg = "An error occurred";
    mockFetchQuestions.mockResolvedValueOnce(left(errMsg));
    const { recipeStore, errorStore } = createStores();

    await recipeStore.start();

    expect(errorStore.setError).toBeCalledTimes(1);
    expect(errorStore.setError).toBeCalledWith(errMsg);
  });
});

function createStores(): {
  errorStore: IErrorStore;
  recipeStore: IRecipeStore;
} {
  const errorStore = { setError: jest.fn() } as unknown as IErrorStore;
  const recipeStore = newRecipeStore(errorStore);
  return { errorStore, recipeStore };
}
