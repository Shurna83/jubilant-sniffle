import React, { useEffect } from "react";
import { Header } from "./components/header";
import { Quiz } from "./components/quiz";
import { RootStore } from "./store/rootStore";
import { useRootStore } from "./store/storeContext";

function App() {
  const rootStore = useRootStore();

  useEffect(() => {
    const kickItAllOff = async (rootStore: RootStore) => {
      await rootStore.init();
    };
    kickItAllOff(rootStore);
  }, [rootStore]);

  return (
    <>
      <Header />
      <Quiz />
    </>
  );
}

export default App;
