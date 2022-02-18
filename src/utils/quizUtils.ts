import { QuizResult } from "../domain/definitions";

const evaluationMap = new Map<number, string>();
evaluationMap.set(0, "Non sai fare la carbonara");
evaluationMap.set(1, "Non ci siamo");
evaluationMap.set(2, "Devi studiare di più");
evaluationMap.set(3, "Bravo");

export function newQuizResult(
  correctAnswersCount: number,
  totQuestions: number
): QuizResult {
  return {
    finalEvaluation: toFinalEvaluation(correctAnswersCount),
    correctAnswers: correctAnswersCount,
    totalQuestions: totQuestions,
  };
}

function toFinalEvaluation(correctAnswers: number): string {
  return evaluationMap.has(correctAnswers)
    ? evaluationMap.get(correctAnswers)!
    : evaluationMap.get(0)!;
}
