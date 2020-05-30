import { AnyAction } from "redux";
import { storeFlashcardDetail } from "./store/actions";
import { RootState } from "../../store/rootReducer";
import { ThunkAction } from "redux-thunk";

export const getFlashcardDetail = (
  id: string
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    // TODO API から取得詳細をする
    dispatch(
      storeFlashcardDetail({
        id,
        name: "dasdf",
      })
    );
  };
};
