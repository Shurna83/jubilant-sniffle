import { makeAutoObservable, runInAction } from "mobx";
import {
  newQuizResult,
  QuizResult,
  RecipeQuestion,
} from "../domain/definitions";
import { IRecipeStore } from "./recipeStore";

export type UIQuestion = Pick<
  RecipeQuestion,
  "domainId" | "question" | "answers"
> & {
  setAnswer: (answerId: number) => void;
};

export interface IQuizStore {
  readonly currentQuestion: UIQuestion | null;
  readonly quizResult: QuizResult | null;
  readonly isQuestionStep: boolean;
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

    const { questions } = this._recipeStore;
    const { domainId, answers, question, correctAnswerId } =
      questions[this._currentStepIdx];
    return {
      domainId,
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
      : this.areThereAnyQuestions
      ? newQuizResult(this._correctAnswersCount)
      : null;
  }

  public get areThereAnyQuestions(): boolean {
    return this._recipeStore.questions.length > 0;
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
