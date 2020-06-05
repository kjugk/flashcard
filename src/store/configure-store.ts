import { configureStore as reduxConfigureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import thunk from "redux-thunk";

export function configureStore() {
  return reduxConfigureStore({
    reducer: rootReducer,
    middleware: [thunk],
  });
}
