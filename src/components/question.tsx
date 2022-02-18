import { UIQuestion } from "../store/quizStore";
import { AnswersList } from "./answerList";

type QuestionProps = { question: UIQuestion };

export function Question({ question }: QuestionProps): JSX.Element {
  const handleUserAnswer = (id: number) => {
    question.setAnswer(id);
  };
  return (
    <>
      <h4 className="questionText">{question.question}</h4>
      <AnswersList answers={question.answers} onClick={handleUserAnswer} />
    </>
  );
}
