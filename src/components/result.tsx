import { QuizResult } from "../domain/definitions";

type ResultProps = { quizResult: QuizResult };

export function Result({
  quizResult: { finalEvaluation, correctAnswers, totalQuestions },
}: ResultProps): JSX.Element {
  return (
    <>
      <h3>
        Hai risposto correttamente a {correctAnswers}
        {correctAnswers === 1 ? " domanda" : " domande"} su {totalQuestions}
      </h3>
      <p>{finalEvaluation}</p>
    </>
  );
}
