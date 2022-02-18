import { makeAutoObservable, runInAction } from "mobx";
import { fetchQuestions } from "../api/apiClient";
import { RecipeQuestion } from "../domain/definitions";
import { isRight } from "../utils/either";
import { IErrorStore } from "./errorsStore";

export interface IRecipeStore {
  readonly questions: RecipeQuestion[];
  start(): Promise<void>;
}

class RecipeStore implements IRecipeStore {
  private _questions: RecipeQuestion[] = [];

  constructor(private readonly _errorStore: IErrorStore) {
    makeAutoObservable(this);
  }

  public async start(): Promise<void> {
    const res = await fetchQuestions();
    if (isRight(res)) {
      runInAction(() => {
        this._questions = res.value;
      });
    } else {
      this._errorStore.setError(res.value);
    }
  }

  public get questions(): RecipeQuestion[] {
    return this._questions;
  }
}

export function newRecipeStore(errorStore: IErrorStore): IRecipeStore {
  return new RecipeStore(errorStore);
}
