export type DomainId = "question" | "result";

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

export function newQuizResult(correctAnswersCount: number): QuizResult {
  return {
    domainId: "result",
    finalEvaluation: toFinalEvaluation(correctAnswersCount),
  };
}

function toFinalEvaluation(correctAnswers: number): string {
  return evaluationMap.has(correctAnswers)
    ? evaluationMap.get(correctAnswers)!
    : evaluationMap.get(0)!;
}
