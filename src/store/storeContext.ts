import { createContext, useContext } from "react";
import { IErrorStore } from "./errorsStore";
import { IQuizStore } from "./quizStore";
import { RootStore } from "./rootStore";

export const RootContext = createContext<RootStore | undefined>(undefined);

export function useRootStore(): RootStore {
  const rootStore = useContext(RootContext);
  if (!rootStore) {
    throw new Error("Undefined rootStore in RootContext");
  }
  return rootStore;
}

export function useQuizStore(): IQuizStore {
  return useRootStore().quizStore;
}

export function useErrorStore(): IErrorStore {
  return useRootStore().errorStore;
}
