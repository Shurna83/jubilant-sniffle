import { createContext, useContext } from "react";
import { IErrorStore } from "./errorsStore";
import { IQuizStore } from "./quizStore";
import { getRootStore, RootStore } from "./rootStore";

export const RootContext = createMobXRootContext();

function createMobXRootContext() {
  return createContext<RootStore>(getRootStore());
}

export function useRootStore(): RootStore {
  return useContext(RootContext);
}

export function useQuizStore(): IQuizStore {
  return useRootStore().quizStore;
}

export function useErrorStore(): IErrorStore {
  return useRootStore().errorStore;
}
