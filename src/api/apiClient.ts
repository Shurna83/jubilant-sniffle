import { RecipeQuestion } from "../domain/definitions";
import { httpGet } from "../http/httpClient";
import { Either, isLeft, left, right } from "../utils/either";

export type RawRecipeQuestion = {
  question: string;
  answers: string[];
  correct: number;
};

export async function fetchQuestions(): Promise<
  Either<string, RecipeQuestion[]>
> {
  const res = await httpGet<RawRecipeQuestion[]>("data.json");
  return isLeft(res) ? res : parseQuestions(res.value);
}

function parseQuestions(
  raw: RawRecipeQuestion[]
): Either<string, RecipeQuestion[]> {
  try {
    const questions: RecipeQuestion[] = raw.map(
      ({ answers, correct, question }) => ({
        correctAnswerId: correct,
        answers: answers.map((a, i) => ({ answer: a, id: i })),
        question,
      })
    );
    return right(questions);
  } catch (e) {
    return left(
      `Cannot understand server response: '${(e as Error)?.message || e}'`
    );
  }
}
