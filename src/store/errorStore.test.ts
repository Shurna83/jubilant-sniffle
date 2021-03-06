import { reaction } from "mobx";
import { newErrorStore } from "./errorsStore";

test("when error is set, then computed is stimulated", () => {
  const errMsg = "An error message";
  const store = newErrorStore();
  let receivedError: string | null = null;
  reaction(
    () => store.error,
    (err) => {
      receivedError = err;
    }
  );

  store.setError(errMsg);

  expect(receivedError).toEqual(errMsg);
});
