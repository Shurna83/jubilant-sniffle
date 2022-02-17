import { RecipeQuestion } from "../domain/domain";
import { httpGet } from "../http/httpClient";
import { Either, isLeft, left, right } from "../utils/either";

export async function fetchQuestions(): Promise<
  Either<string, RecipeQuestion[]>
> {
  const res = await httpGet<string>("data.json");
  return isLeft(res) ? left(res.value) : parseQuestions(res.value);
}

type RawRecipeQuestion = {
  question: string;
  answers: string[];
  correct: number;
};

function parseQuestions(json: string): Either<string, RecipeQuestion[]> {
  try {
    const raw: RawRecipeQuestion[] = JSON.parse(json);
    const questions: RecipeQuestion[] = raw.map(
      ({ answers, correct, question }) => ({
        domainId: "question",
        correctAnswerId: correct,
        answers,
        question,
      })
    );
    return right(questions);
  } catch (e) {
    return left("Cannot understand server response");
  }
}
