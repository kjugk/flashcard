import { Dispatch } from "react";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { FlashcardDetailPageAction } from "./store";
import { SystemAction } from "../../../global/store/system.store";

export const getFlashcardDetail = async (
  id: string,
  dispatch: Dispatch<FlashcardDetailPageAction>
) => {
  dispatch({
    type: "update-loading",
    payload: true,
  });

  try {
    const item = await flashcardRepository.find(id);
    dispatch({
      type: "store-flashcard-detail",
      payload: item,
    });
  } finally {
    dispatch({
      type: "update-loading",
      payload: false,
    });
  }
};

export const deleteFlashcard = async (
  id: string,
  detailPageDispatch: Dispatch<FlashcardDetailPageAction>,
  systemDispatch: Dispatch<SystemAction>
) => {
  detailPageDispatch({
    type: "update-deleting",
    payload: true,
  });

  try {
    await flashcardRepository.delete(id);
    systemDispatch({
      type: "set-system-message",
      payload: {
        messageType: "info",
        message: "削除しました。",
      },
    });
  } finally {
    detailPageDispatch({
      type: "update-deleting",
      payload: false,
    });
  }
};
