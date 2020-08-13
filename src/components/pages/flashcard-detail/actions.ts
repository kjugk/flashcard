import { Dispatch } from "react";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { FlashcardDetailPageAction } from "./store";
import { SystemAction } from "../../../providers/system";

export const getFlashcardDetail = async (
  id: string,
  dispatch: Dispatch<FlashcardDetailPageAction>
) => {
  dispatch({
    type: "update-loading",
    payload: true,
  });

  const item = await flashcardRepository.find(id);
  dispatch({
    type: "store-flashcard-detail",
    payload: item,
  });
};

export const deleteFlashcard = async (
  id: string,
  dispatch: Dispatch<FlashcardDetailPageAction>,
  systemDispatch: Dispatch<SystemAction>
) => {
  dispatch({
    type: "update-deleting",
    payload: true,
  });

  try {
    await flashcardRepository.delete(id);
    systemDispatch({
      type: "set-system-info-message",
      payload: "削除しました",
    });
  } finally {
    dispatch({
      type: "update-deleting",
      payload: false,
    });
  }
};
