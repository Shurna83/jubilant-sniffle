import { Answer } from "../domain/definitions";

type AnswerItemProp = { answer: Answer; onClick: (id: number) => void };

export function AnswerItem({
  answer: { answer, id },
  onClick,
}: AnswerItemProp): JSX.Element {
  const handleClick = () => {
    onClick(id);
  };
  return <li onClick={handleClick}>{answer}</li>;
}
