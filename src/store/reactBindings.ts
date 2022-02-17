import { createContext, useContext } from "react";
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
