import { FlashcardRepository } from "../../repositories/flashcard/flashcard-repository";
import { IFlashcardCreateForm } from "./types";
const repository = new FlashcardRepository();

export const createFlashcard = async (
  form: IFlashcardCreateForm
): Promise<string> => {
  // TODO 共通エラー処理
  const id = await repository.create(form);
  return id;
};
