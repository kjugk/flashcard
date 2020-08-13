import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { IFlashcardCreateForm } from "./types";

export const createFlashcard = async (
  form: IFlashcardCreateForm
): Promise<string> => {
  // TODO 共通エラー処理
  const id = await flashcardRepository.create(form);
  return id;
};
