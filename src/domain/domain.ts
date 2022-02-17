import { Either, isLeft, left, right } from "../utils/either";

type DomainId = "question" | "result";

export type RecipeQuestion = {
  readonly domainId: Extract<DomainId, "question">;

  readonly question: string;
  readonly answers: string[];
  readonly correctAnswerId: number;
};

export type QuizResult = {
  readonly domainId: Extract<DomainId, "result">;
  readonly finalEvaluation: string;
};

const evaluationMap = new Map<number, string>();
evaluationMap.set(0, "Non sai fare la carbonara");
evaluationMap.set(1, "Non ci siamo");
evaluationMap.set(2, "Devi studiare di più");
evaluationMap.set(3, "Bravo");

export function newQuizResult(
  correctAnswersCount: number
): Either<string, QuizResult> {
  const res = toFinalEvaluation(correctAnswersCount);
  if (isLeft(res)) {
    return res;
  }
  const quizRes: QuizResult = {
    domainId: "result",
    finalEvaluation: res.value,
  };
  return right(quizRes);
}

function toFinalEvaluation(correctAnswers: number): Either<string, string> {
  return evaluationMap.has(correctAnswers)
    ? right(evaluationMap.get(correctAnswers)!)
    : left("Cannot detect quiz result");
}
