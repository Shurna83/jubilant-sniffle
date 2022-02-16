import { RecipeQuestion } from "../domain/RecipeQuestion";
import { httpGet } from "../http/httpClient";
import { Either, isLeft, left, right } from "../utils/either";

export async function fetchQuestions(): Promise<
  Either<string, RecipeQuestion[]>
> {
  const res = await httpGet<string>("data.json");
  return isLeft(res) ? left(res.value) : parseQuestions(res.value);
}

function parseQuestions(json: string): Either<string, RecipeQuestion[]> {
  try {
    const questions: RecipeQuestion[] = JSON.parse(json);
    return right(questions);
  } catch (e) {
    return left("Cannot understand server response");
  }
}
