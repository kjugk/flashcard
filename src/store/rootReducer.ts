import { combineReducers } from "redux";
import { flashcardListPageReducer } from "../pages/flashcard-list-page/store/reducers";
import { flashcardDetailPageReducer } from "../pages/flashcard-detail-page/store/reducers";

export const rootReducer = combineReducers({
  flashcardListPage: flashcardListPageReducer,
  flashcardDetailPage: flashcardDetailPageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
