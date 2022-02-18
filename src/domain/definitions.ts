export type Answer = { answer: string; id: number };

export type RecipeQuestion = {
  readonly question: string;
  readonly answers: Answer[];
  readonly correctAnswerId: number;
};

export type QuizResult = {
  readonly finalEvaluation: string;
  readonly correctAnswers: number;
  readonly totalQuestions: number;
};
