import { Dispatch } from "react";
import { FlashcardRepository } from "../../repositories/flashcard/flashcard-repository";
import { FlashcardDetailPageAction } from "./store";
import { SystemAction } from "../../shared/store/system";

const repository = new FlashcardRepository();

export const getFlashcardDetail = async (
  id: string,
  dispatch: Dispatch<FlashcardDetailPageAction>,
  systemDispatch: Dispatch<SystemAction>
) => {
  dispatch({
    type: "update-loading",
    payload: true,
  });

  const item = await repository.find(id);
  dispatch({
    type: "store-flashcard-detail",
    payload: item,
  });

  systemDispatch({
    type: "set-system-info-message",
    payload: "削除したよ。",
  });
};

export const deleteFlashcard = async (
  id: string,
  dispatch: Dispatch<FlashcardDetailPageAction>
) => {
  // useEffect 使ってできるかも
  dispatch({
    type: "update-deleting",
    payload: true,
  });
  await repository.delete(id);
  // TODO global message を dispatch する

  dispatch({
    type: "update-deleting",
    payload: false,
  });
};
