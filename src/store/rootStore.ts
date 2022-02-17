import { newErrorStore } from "./errorsStore";
import { IQuizStore, newQuizStore } from "./quizStore";
import { IRecipeStore, newRecipeStore } from "./recipeStore";

export type RootStore = {
  quizStore: IQuizStore;
  recipeStore: IRecipeStore;
};

let rootStore: RootStore | null = null;
export function getRootStore(): RootStore {
  return rootStore ?? (rootStore = newRootStore());
}

function newRootStore(): RootStore {
  const errorStore = newErrorStore();
  const recipeStore = newRecipeStore(errorStore);
  const quizStore = newQuizStore(recipeStore);

  return {
    quizStore,
    recipeStore,
  };
}