import { observer } from "mobx-react-lite";
import { useErrorStore, useQuizStore } from "../store/storeContext";
import { ErrorMessage } from "./errorMessage";
import { Question } from "./question";
import { Result } from "./result";

export const Quiz = observer(() => {
  const { currentQuestion, quizResult } = useQuizStore();
  const { error } = useErrorStore();
  return (
    <main>
      {error ? (
        <ErrorMessage message={error} />
      ) : currentQuestion ? (
        <Question question={currentQuestion} />
      ) : quizResult ? (
        <Result quizResult={quizResult} />
      ) : null}
    </main>
  );
});
