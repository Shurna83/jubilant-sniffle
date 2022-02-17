import { makeAutoObservable } from "mobx";
import { newQuizResult, QuizResult, RecipeQuestion } from "../domain/domain";
import { Either, isLeft, left, right } from "../utils/either";
import { IRecipeStore } from "./recipeStore";

type QuizStep = RecipeQuestion | QuizResult;

export interface IQuizStore {
  readonly nextStep: Either<string, QuizStep>;
  setAnswer(question: RecipeQuestion, answer: number): void;
}

class QuizStore implements IQuizStore {
  private readonly _currentStep: number = 0;

  private _correctAnswersCount: number = 0;

  constructor(private readonly _recipeStore: IRecipeStore) {
    makeAutoObservable(this);
  }

  public get currentStep(): number {
    return this._currentStep;
  }

  public get nextStep(): Either<string, QuizStep> {
    const { questions } = this._recipeStore;
    if (this._currentStep < 0 || this._currentStep > questions.length) {
      return left("Something went wrong reading quiz step");
    }

    if (this._currentStep === questions.length) {
      const res = newQuizResult(this._correctAnswersCount);
      return isLeft(res) ? left<string>(res.value) : res;
    }

    return right(questions[this._currentStep]);
  }

  public setAnswer(question: RecipeQuestion, answer: number): void {
    if (question.correctAnswerId === answer) {
      this._correctAnswersCount++;
    }
  }
}

export function newQuizStore(recipeStore: IRecipeStore): IQuizStore {
  return new QuizStore(recipeStore);
}
