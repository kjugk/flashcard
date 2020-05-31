// TODO この層が本当に必要か検討する
// データソースが変わることが無いので、repository が 直接 client に依存しても良さそう
// この層で、API の I/O を定義して閉じ込める
import {
  FlashcardFindResponse,
  FlashcardGetAllResponse,
} from "./http-flashcard-response";

export class HttpFlashcardApi {
  constructor() {
    // http clinet を DI する
  }

  getAll(): Promise<FlashcardGetAllResponse> {
    return new Promise((resolve) => {
      resolve({
        flashcards: [
          {
            id: "dasdf",
            name: "first item",
          },
        ],
      });
    });
  }

  find(id: string): Promise<FlashcardFindResponse> {
    return new Promise((resolve) => {
      resolve({
        flashcard: {
          id: "dklkasdf",
          name: "first item",
        },
      });
    });
  }
}
