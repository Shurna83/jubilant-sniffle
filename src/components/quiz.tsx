import { RecipeQuestion } from "../domain/domain";
import { useQuizStore } from "../store/reactBindings";
import { isLeft } from "../utils/either";

export function Quiz(): JSX.Element {
  const { nextStep } = useQuizStore();
  if (isLeft(nextStep)) {
    return <span>{nextStep.value}</span>;
  }
  if (nextStep.value.domainId === "question") {
    const item = nextStep.value as RecipeQuestion;
    return (
      <main>
        <h3>{item.question}</h3>
        <ol>
          {item.answers.map((answer) => (
            <li key={answer}>{answer}</li>
          ))}
        </ol>
      </main>
    );
  }
  return <span>ANSWERS YET TO BE RENDERED</span>;
}
