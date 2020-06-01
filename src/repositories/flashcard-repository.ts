import { FlashcardListItem } from "../shared/types/flashcard-list-item";
import { FlashcardDetail } from "../shared/types/flashcard-detail";
import { HttpFlashcardApi } from "../apis/http/flashcard/http-flashcard-api";

export class FlashcardRepository {
  private http: HttpFlashcardApi;
  constructor() {
    // TODO api を DI する
    this.http = new HttpFlashcardApi();
  }

  async getAll(): Promise<FlashcardListItem[]> {
    const response = await this.http.getAll();

    return response.flashcards.map((f) => {
      return {
        name: f.name,
        id: f.id,
      };
    });
  }

  async find(id: string): Promise<FlashcardDetail> {
    const response = await this.http.find(id);

    return {
      id: response.flashcard.id,
      name: response.flashcard.name,
      description: "最初に作った単語帳",
      qaList: [
        {
          question: "apple",
          answer: "りんご",
          explanation: "",
        },
        {
          question: "book",
          answer: "本",
          explanation: "",
        },
      ],
    };
  }
}
