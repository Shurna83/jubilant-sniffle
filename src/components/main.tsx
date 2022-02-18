import { observer } from "mobx-react-lite";
import { useErrorStore, useQuizStore } from "../store/storeContext";
import { ErrorMessage } from "./errorMessage";
import { Quiz } from "./quiz";
import { Result } from "./result";

export const Main = observer(() => {
  const { quizResult, canAskQuestion } = useQuizStore();
  const { error } = useErrorStore();
  return (
    <main className="vBox crossAxisCenter gap1">
      {error ? (
        <ErrorMessage message={error} />
      ) : canAskQuestion ? (
        <Quiz />
      ) : quizResult ? (
        <Result quizResult={quizResult} />
      ) : null}
    </main>
  );
});
