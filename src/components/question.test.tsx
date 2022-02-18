import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Question } from "./question";

test("question text is displayed", () => {
  const txt = "questionText";
  render(
    <Question
      question={{
        answers: [
          { answer: "a11", id: 0 },
          { answer: "a12", id: 1 },
        ],
        question: txt,
        setAnswer: jest.fn(),
      }}
    />
  );

  expect(screen.getByText(txt)).toBeInTheDocument();
});

test("answers are displayed", () => {
  render(
    <Question
      question={{
        answers: [
          { answer: "A1", id: 0 },
          { answer: "A2", id: 1 },
        ],
        question: "Q",
        setAnswer: jest.fn(),
      }}
    />
  );

  expect(screen.getByText("A1")).toBeInTheDocument();
  expect(screen.getByText("A2")).toBeInTheDocument();
});

test("when answer is selected, then selection is propagated", () => {
  const mockSetAnswer = jest.fn();
  render(
    <Question
      question={{
        answers: [
          { answer: "A1", id: 0 },
          { answer: "A2", id: 1 },
        ],
        question: "Q",
        setAnswer: mockSetAnswer,
      }}
    />
  );

  userEvent.click(screen.getByText("A1"));

  expect(mockSetAnswer).toBeCalledTimes(1);
  expect(mockSetAnswer).toBeCalledWith(0);
});
