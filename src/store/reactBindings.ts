import { createContext, useContext } from "react";
import { IErrorStore } from "./errorsStore";
import { IQuizStore } from "./quizStore";
import { newRootStore, RootStore } from "./rootStore";

export const RootContext = createMobXRootContext();

function createMobXRootContext() {
  return createContext<RootStore>(newRootStore());
}

export function useRootStore(): RootStore {
  const ctx = useContext(RootContext);
  if (!ctx) {
    throw new Error("Undefined context");
  }
  return ctx;
}

export function useQuizStore(): IQuizStore {
  return useRootStore().quizStore;
}

export function useErrorStore(): IErrorStore {
  return useRootStore().errorStore;
}
