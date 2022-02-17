import { UIQuestion } from "../store/quizStore";
import { AnswersList } from "./answerList";

type QuestionProps = { question: UIQuestion };

export function Question({ question }: QuestionProps): JSX.Element {
  const handleUserAnswer = (id: number) => {
    question.setAnswer(id);
  };
  return (
    <>
      <h3>{question.question}</h3>
      <AnswersList answers={question.answers} onClick={handleUserAnswer} />
    </>
  );
}
