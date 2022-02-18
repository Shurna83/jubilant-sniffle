import { IErrorStore, newErrorStore } from "./errorsStore";
import { IQuizStore, newQuizStore } from "./quizStore";
import { IRecipeStore, newRecipeStore } from "./recipeStore";

export type RootStore = {
  quizStore: IQuizStore;
  recipeStore: IRecipeStore;
  errorStore: IErrorStore;
  init(): Promise<void>;
};

export function newRootStore(): RootStore {
  const errorStore = newErrorStore();
  const recipeStore = newRecipeStore(errorStore);
  const quizStore = newQuizStore(recipeStore);

  return {
    quizStore,
    recipeStore,
    errorStore,
    init: async () => {
      await recipeStore.start();
    },
  };
}
