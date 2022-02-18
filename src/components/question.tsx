import { UIQuestion } from "../store/quizStore";
import { AnswersList } from "./answerList";

type QuestionProps = { question: UIQuestion };

export function Question({ question }: QuestionProps) {
  const handleUserAnswer = (id: number) => {
    question.setAnswer(id);
  };
  return (
    <div className="vBox crossAxisCenter question">
      <h4 className="questionText">{question.question}</h4>
      <AnswersList answers={question.answers} onClick={handleUserAnswer} />
    </div>
  );
}
