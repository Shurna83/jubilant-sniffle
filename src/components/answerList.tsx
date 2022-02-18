import { Answer } from "../domain/definitions";
import { AnswerItem } from "./answerItem";

type AnswersListProps = {
  answers: Answer[];
  onClick: (id: number) => void;
};

export function AnswersList({
  answers,
  onClick,
}: AnswersListProps): JSX.Element {
  return (
    <ol className="answersList">
      {answers.map((answer) => (
        <AnswerItem answer={answer} key={answer.id} onClick={onClick} />
      ))}
    </ol>
  );
}
