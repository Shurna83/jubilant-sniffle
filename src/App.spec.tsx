import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { RawRecipeQuestion } from "./api/apiClient";
import App from "./App";
import { newRootStore } from "./store/rootStore";
import { RootContext } from "./store/storeContext";
import { getTwoRawQuestions } from "./__test__/utils/fakeData";

jest.mock("axios", () => ({
  get: jest.fn(),
  isAxiosError: jest.fn(() => false),
}));
const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

it("when loaded, then data is fetched", () => {
  givenTwoQuestionsFetched();

  renderApp();

  expect(mockAxiosGet).toBeCalledTimes(1);
  expect(mockAxiosGet).toBeCalledWith("data.json");
});

it("when data is fetched, then first question is displayed", async () => {
  givenTwoQuestionsFetched();

  renderApp();

  await screen.findByText("q1");
  await screen.findByText("a11");
  await screen.findByText("a12");
});

it("when first question is answered, then second question is displayed", async () => {
  givenTwoQuestionsFetched();
  renderApp();

  await userAnswers("a11");

  await screen.findByText("q2");
  await screen.findByText("a21");
  await screen.findByText("a22");
});

it("when second question is answered, then result is displayed", async () => {
  givenTwoQuestionsFetched();
  renderApp();
  await userAnswers("a11");

  await userAnswers("a21");

  await screen.findByText(/Hai risposto/);
});

type HappyPathTest = {
  correctAnswers: number;
  a1: string;
  a2: string;
  a3: string;
  summary: string;
  evaluation: string;
};

it.each`
  correctAnswers | a1       | a2       | a3       | summary                                          | evaluation
  ${0}           | ${"a12"} | ${"a21"} | ${"a32"} | ${"Hai risposto correttamente a 0 domande su 3"} | ${"Non sai fare la carbonara"}
  ${1}           | ${"a11"} | ${"a21"} | ${"a32"} | ${"Hai risposto correttamente a 1 domanda su 3"} | ${"Non ci siamo"}
  ${2}           | ${"a11"} | ${"a22"} | ${"a32"} | ${"Hai risposto correttamente a 2 domande su 3"} | ${"Devi studiare di più"}
  ${3}           | ${"a11"} | ${"a22"} | ${"a33"} | ${"Hai risposto correttamente a 3 domande su 3"} | ${"Bravo"}
`(
  "when $correctAnswers correct answer(s), then proper evaluation is displayed",
  async ({ a1, a2, a3, evaluation, summary }: HappyPathTest) => {
    givenThreeQuestionsFetched();
    renderApp();

    await userAnswers(a1);
    await userAnswers(a2);
    await userAnswers(a3);

    await screen.findByText(summary);
    await screen.findByText(evaluation);
  }
);

async function userAnswers(answerText: string): Promise<void> {
  const answer = await screen.findByText(answerText);

  userEvent.click(answer);
}

function renderApp() {
  render(
    <RootContext.Provider value={newRootStore()}>
      <App />
    </RootContext.Provider>
  );
}

function givenTwoQuestionsFetched() {
  mockAxiosGet.mockResolvedValueOnce({ data: getTwoRawQuestions() });
}

function givenThreeQuestionsFetched() {
  mockAxiosGet.mockResolvedValueOnce({
    data: [
      { question: "q1", answers: ["a11", "a12", "a13"], correct: 0 },
      { question: "q2", answers: ["a21", "a22", "a23"], correct: 1 },
      { question: "q3", answers: ["a31", "a32", "a33"], correct: 2 },
    ] as RawRecipeQuestion[],
  });
}
