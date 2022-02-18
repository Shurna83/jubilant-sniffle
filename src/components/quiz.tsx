import { observer } from "mobx-react-lite";
import { useQuizStore } from "../store/storeContext";
import { Header } from "./header";
import { Question } from "./question";

export const Quiz = observer((): JSX.Element | null => {
  const { currentQuestion } = useQuizStore();

  return currentQuestion ? (
    <>
      <Header />
      <Question question={currentQuestion} />
    </>
  ) : null;
});
