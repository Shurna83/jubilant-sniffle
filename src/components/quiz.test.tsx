import { render, screen } from "@testing-library/react";
import { IErrorStore } from "../store/errorsStore";
import { UIQuestion } from "../store/quizStore";
import { useErrorStore, useQuizStore } from "../store/storeContext";
import { Quiz } from "./quiz";

jest.mock("../store/storeContext");
const mockUseErrorStore = useErrorStore as jest.MockedFunction<
  typeof useErrorStore
>;
const mockUseQuizStore = useQuizStore as jest.MockedFunction<
  typeof useQuizStore
>;

test("when an error is set, then it is rendered", () => {
  const error = "an error";
  mockUseErrorStore.mockReturnValueOnce({ error } as IErrorStore);
  mockUseQuizStore.mockReturnValueOnce({
    currentQuestion: null,
    quizResult: null,
  });

  render(<Quiz />);

  expect(screen.getByText(error)).toBeInTheDocument();
});

test("when an error is set, then it takes precedence over a question", () => {
  const error = "an error";
  mockUseErrorStore.mockReturnValueOnce({ error } as IErrorStore);
  mockUseQuizStore.mockReturnValueOnce({
    currentQuestion: {} as UIQuestion,
    quizResult: null,
  });

  render(<Quiz />);

  expect(screen.getByText(error)).toBeInTheDocument();
});

test("when an error is set, then it takes precedence over a result", () => {
  const error = "an error";
  mockUseErrorStore.mockReturnValueOnce({ error } as IErrorStore);
  mockUseQuizStore.mockReturnValueOnce({
    currentQuestion: null,
    quizResult: { correctAnswers: 1, totalQuestions: 1, finalEvaluation: "OK" },
  });

  render(<Quiz />);

  expect(screen.getByText(error)).toBeInTheDocument();
});

test("when a result is set, then it is displayed", () => {
  const finalEvaluation = "Bravo!";
  mockUseErrorStore.mockReturnValueOnce({ error: null } as IErrorStore);
  mockUseQuizStore.mockReturnValueOnce({
    currentQuestion: null,
    quizResult: { correctAnswers: 1, totalQuestions: 1, finalEvaluation },
  });

  render(<Quiz />);

  expect(screen.getByText(finalEvaluation)).toBeInTheDocument();
});

test("when a question is set, then it is displayed", () => {
  const question = "Q";
  const answer = "A";
  mockUseErrorStore.mockReturnValueOnce({ error: null } as IErrorStore);
  mockUseQuizStore.mockReturnValueOnce({
    currentQuestion: {
      question,
      answers: [{ answer, id: 0 }],
    } as UIQuestion,
    quizResult: null,
  });

  render(<Quiz />);

  expect(screen.getByText(question)).toBeInTheDocument();
  expect(screen.getByText(answer)).toBeInTheDocument();
});
