import { combineReducers, Action } from "redux";

const flashcards = (state = [], action: Action<any>) => {
  return state;
};

export const rootReducer = combineReducers({
  flashcards,
});
