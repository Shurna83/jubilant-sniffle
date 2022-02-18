import { QuizResult } from "../domain/definitions";

type ResultProps = { quizResult: QuizResult };

export function Result({
  quizResult: { finalEvaluation, correctAnswers, totalQuestions },
}: ResultProps): JSX.Element {
  return (
    <header className="vBox crossAxisCenter gap2 quizResult">
      <h4>
        Hai risposto correttamente a {correctAnswers}
        {correctAnswers === 1 ? " domanda" : " domande"} su {totalQuestions}
      </h4>
      <h1>{finalEvaluation}</h1>
    </header>
  );
}
