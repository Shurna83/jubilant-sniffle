import { observer } from "mobx-react-lite";
import { useQuizStore } from "../store/reactBindings";
import { Question } from "./question";
import { Result } from "./result";

export const Quiz = observer(() => {
  const { currentQuestion, quizResult } = useQuizStore();
  return (
    <main>
      {currentQuestion ? (
        <Question question={currentQuestion} />
      ) : quizResult ? (
        <Result quizResult={quizResult} />
      ) : null}
    </main>
  );
});
