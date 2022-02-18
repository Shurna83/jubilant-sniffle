import { render, screen } from "@testing-library/react";
import { Result } from "./result";

test("when single correct answer, then message is singular", () => {
  render(
    <Result
      quizResult={{
        correctAnswers: 1,
        totalQuestions: 3,
        finalEvaluation: "NO",
      }}
    />
  );

  expect(
    screen.getByText("Hai risposto correttamente a 1 domanda su 3")
  ).toBeInTheDocument();
});

test.each([0, 2, 3])(
  "when correct answers are %s, then message is plural",
  (correctAnswers) => {
    render(
      <Result
        quizResult={{
          correctAnswers,
          totalQuestions: 3,
          finalEvaluation: "NO",
        }}
      />
    );

    expect(
      screen.getByText(
        `Hai risposto correttamente a ${correctAnswers} domande su 3`
      )
    ).toBeInTheDocument();
  }
);

test("final evaluation is displayed", () => {
  const finalEvaluation = "And the final evaluation is NO";
  render(
    <Result
      quizResult={{
        correctAnswers: 2,
        totalQuestions: 3,
        finalEvaluation,
      }}
    />
  );

  expect(screen.getByText(finalEvaluation)).toBeInTheDocument();
});
