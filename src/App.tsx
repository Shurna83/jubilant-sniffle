import React, { useEffect } from "react";
import { Main } from "./components/main";
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

  return <Main />;
}

export default App;
