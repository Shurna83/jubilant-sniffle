import { IErrorStore, newErrorStore } from "./errorsStore";
import { IQuizStore, newQuizStore } from "./quizStore";
import { IRecipeStore, newRecipeStore } from "./recipeStore";
import { getRootStore } from "./rootStore";

jest.mock("./errorsStore");
const mockNewErrorStore = newErrorStore as jest.MockedFunction<
  typeof newErrorStore
>;

jest.mock("./recipeStore");
const mockNewRecipeStore = newRecipeStore as jest.MockedFunction<
  typeof newRecipeStore
>;

jest.mock("./quizStore");
const mockNewQuizStore = newQuizStore as jest.MockedFunction<
  typeof newQuizStore
>;

afterEach(() => {
  mockNewErrorStore.mockReset();
  mockNewRecipeStore.mockReset();
  mockNewQuizStore.mockReset();
});

describe("getRootStore", () => {
  test("new instance is created", () => {
    fakeNewStoreFuncs();

    const rootStore = getRootStore();

    expect(rootStore).toBeDefined();
    expect(rootStore).not.toBeNull();
  });

  test("when invoked twice, then same instance is returned", () => {
    fakeNewStoreFuncs();

    // eslint-disable-next-line no-self-compare
    expect(getRootStore() === getRootStore()).toBe(true);
  });
});

function fakeNewStoreFuncs(): void {
  mockNewErrorStore.mockReturnValueOnce({} as unknown as IErrorStore);
  mockNewRecipeStore.mockReturnValueOnce({} as unknown as IRecipeStore);
  mockNewQuizStore.mockReturnValueOnce({} as unknown as IQuizStore);
}
