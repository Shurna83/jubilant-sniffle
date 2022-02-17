import React, { useEffect } from "react";
import { Header } from "./components/header";
import { Quiz } from "./components/quiz";
import { RootContext } from "./store/reactBindings";
import { getRootStore, RootStore } from "./store/rootStore";

function App() {
  useEffect(() => {
    const kickItAllOff = async (rootStore: RootStore) => {
      await rootStore.init();
    };
    const rootStore = getRootStore();
    kickItAllOff(rootStore);
  }, []);
  return (
    <RootContext.Provider value={getRootStore()}>
      <Header />
      <Quiz />
    </RootContext.Provider>
  );
}

export default App;
