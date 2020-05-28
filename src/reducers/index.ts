import { combineReducers } from "redux";
import { flashcardListPageReducer } from "../pages/flashcard-list-page/store/reducers";

export const rootReducer = combineReducers({
  flashcardListPage: flashcardListPageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
