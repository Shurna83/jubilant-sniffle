import { configureStore } from "@reduxjs/toolkit";

export const newStore = () =>
  configureStore({
    reducer: {},
  });

type StoreType = ReturnType<typeof newStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<StoreType["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<StoreType["dispatch"]>;
