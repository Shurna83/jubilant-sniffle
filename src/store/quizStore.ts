import { makeAutoObservable, runInAction } from "mobx";
import { QuizResult, RecipeQuestion } from "../domain/definitions";
import { newQuizResult } from "../utils/quizUtils";
import { IRecipeStore } from "./recipeStore";

export type UIQuestion = Pick<RecipeQuestion, "question" | "answers"> & {
  setAnswer: (answerId: number) => void;
};

export interface IQuizStore {
  readonly currentQuestion: UIQuestion | null;
  readonly quizResult: QuizResult | null;
}

class QuizStore implements IQuizStore {
  private _currentStepIdx: number = 0;
  private _correctAnswersCount: number = 0;

  constructor(private readonly _recipeStore: IRecipeStore) {
    makeAutoObservable(this);
  }

  public get currentQuestion(): UIQuestion | null {
    if (!this.isQuestionStep) {
      return null;
    }

    const { answers, question, correctAnswerId } =
      this._recipeStore.questions[this._currentStepIdx];
    return {
      answers,
      question,
      setAnswer: (answerId: number) => {
        runInAction(() => {
          this._correctAnswersCount += answerId === correctAnswerId ? 1 : 0;
          this._currentStepIdx++;
        });
      },
    };
  }

  public get quizResult(): QuizResult | null {
    return this.isQuestionStep
      ? null
      : this._recipeStore.questions.length === 0
      ? null
      : newQuizResult(
          this._correctAnswersCount,
          this._recipeStore.questions.length
        );
  }

  public get isQuestionStep(): boolean {
    return (
      this._currentStepIdx >= 0 &&
      this._currentStepIdx < this._recipeStore.questions.length
    );
  }
}

export function newQuizStore(recipeStore: IRecipeStore): IQuizStore {
  return new QuizStore(recipeStore);
}
