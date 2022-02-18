import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RootContext } from "./store/reactBindings";
import { newRootStore } from "./store/rootStore";

if (
  !new (class {
    x: any;
  })().hasOwnProperty("x")
) {
  throw new Error("Transpiler is not configured correctly");
}

ReactDOM.render(
  <React.StrictMode>
    <RootContext.Provider value={newRootStore()}>
      <App />
    </RootContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
