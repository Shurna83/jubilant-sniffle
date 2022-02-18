import { render, screen } from "@testing-library/react";
import { IErrorStore } from "../store/errorsStore";
import { IQuizStore, UIQuestion } from "../store/quizStore";
import { RootStore } from "../store/rootStore";
import {
  RootContext,
  useErrorStore,
  useQuizStore,
} from "../store/storeContext";
import { Main } from "./main";

jest.mock("../store/storeContext");
const mockUseErrorStore = useErrorStore as jest.MockedFunction<
  typeof useErrorStore
>;
const mockUseQuizStore = useQuizStore as jest.MockedFunction<
  typeof useQuizStore
>;

afterEach(() => {
  mockUseErrorStore.mockReset();
  mockUseQuizStore.mockReset();
});

test("when an error is set, then it is rendered", () => {
  const error = "an error";
  const errorStore = givenAnErrorStore(error);
  const quizStore = {
    currentQuestion: null,
    quizResult: null,
    canAskQuestion: false,
  };
  mockUseQuizStore.mockReturnValue(quizStore);

  renderMain({ errorStore, quizStore });

  expect(screen.getByText(error)).toBeInTheDocument();
});

test("when an error is set, then it takes precedence over a question", () => {
  const error = "an error";
  const errorStore = givenAnErrorStore(error);
  const quizStore = {
    currentQuestion: {} as UIQuestion,
    quizResult: null,
    canAskQuestion: true,
  };
  mockUseQuizStore.mockReturnValue(quizStore);

  renderMain({ errorStore, quizStore });

  expect(screen.getByText(error)).toBeInTheDocument();
});

test("when an error is set, then it takes precedence over a result", () => {
  const error = "an error";
  const errorStore = givenAnErrorStore(error);
  const quizStore = {
    currentQuestion: null,
    quizResult: { correctAnswers: 1, totalQuestions: 1, finalEvaluation: "OK" },
    canAskQuestion: false,
  };
  mockUseQuizStore.mockReturnValue(quizStore);

  renderMain({ errorStore, quizStore });

  expect(screen.getByText(error)).toBeInTheDocument();
});

test("when a result is set, then it is displayed", () => {
  const finalEvaluation = "Bravo!";
  const errorStore = givenAnErrorStore();
  const quizStore = {
    currentQuestion: null,
    quizResult: { correctAnswers: 1, totalQuestions: 1, finalEvaluation },
    canAskQuestion: false,
  };
  mockUseQuizStore.mockReturnValue(quizStore);

  renderMain({ errorStore, quizStore });

  expect(screen.getByText(finalEvaluation)).toBeInTheDocument();
});

test("when a question is set, then it is displayed", () => {
  const question = "Q";
  const answer = "A";
  const errorStore = givenAnErrorStore();
  const quizStore = {
    currentQuestion: {
      question,
      answers: [{ answer, id: 0 }],
    } as UIQuestion,
    quizResult: null,
    canAskQuestion: true,
  };
  mockUseQuizStore.mockReturnValue(quizStore);

  renderMain({ errorStore, quizStore });

  expect(screen.getByText(question)).toBeInTheDocument();
  expect(screen.getByText(answer)).toBeInTheDocument();
});

function renderMain({
  errorStore,
  quizStore,
}: {
  errorStore: IErrorStore;
  quizStore: IQuizStore;
}) {
  render(
    <RootContext.Provider value={{ errorStore, quizStore } as RootStore}>
      <Main />
    </RootContext.Provider>
  );
}

function givenAnErrorStore(err?: string): IErrorStore {
  const errorStore = { error: err ?? null } as IErrorStore;
  mockUseErrorStore.mockReturnValue(errorStore);
  return errorStore;
}
