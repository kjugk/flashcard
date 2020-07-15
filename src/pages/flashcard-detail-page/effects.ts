import { Dispatch } from "react";
import { FlashcardRepository } from "../../repositories/flashcard/flashcard-repository";
import { FlashcardDetailPageAction } from "./store";

const repository = new FlashcardRepository();

export const getFlashcardDetail = async (
  id: string,
  dispatch: Dispatch<FlashcardDetailPageAction>
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
