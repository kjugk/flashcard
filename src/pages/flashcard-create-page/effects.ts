import { FlashcardRepository } from "../../repositories/flashcard-repository";
import { IFlashcardCreateForm } from "./store/types";

const repository = new FlashcardRepository();

// TODO 副作用がない場合は、commands などに分けるか検討
export const createFlashcard = async (form: IFlashcardCreateForm) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await repository.create(form);
      setTimeout(() => {
        resolve(id);
      }, 1000);
    } catch (e) {
      // TODO エラーtype別の処理
      reject(e);
    }
  });
};
