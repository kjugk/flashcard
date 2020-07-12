import { FlashcardListItem } from "../../shared/types/flashcard-list-item";
import { FlashcardDetail } from "../../shared/types/flashcard-detail";
import { IFlashcardCreateForm } from "../../pages/flashcard-create-page/types";
import axios, { AxiosInstance } from "axios";
import { GetAllFlashcardResponse } from "./get-all-flashcard-response";
import { GetFlashcardResponse } from "./get-flashcard-response";

export class FlashcardRepository {
  private http: AxiosInstance;

  constructor() {
    // TODO factory 作る
    this.http = axios.create({
      baseURL: "http://localhost:8888/dev/",
      timeout: 1000,
    });
  }

  // API のデータをアプリケーションで使える形式にして返す
  async getAll(): Promise<FlashcardListItem[]> {
    const response = await this.http.get<GetAllFlashcardResponse>("flashcards");

    return response.data.flashcards.map((flashcard) => {
      return {
        name: flashcard.name,
        id: flashcard.id,
      };
    });
  }

  async find(id: string): Promise<FlashcardDetail> {
    const response = await this.http.get<GetFlashcardResponse>(
      `flashcards/${id}`
    );

    const { flashcard } = response.data;

    return {
      id: flashcard.id,
      name: flashcard.name,
      description: flashcard.description,
      qaList: flashcard.qaList,
    };
  }

  async create(form: IFlashcardCreateForm): Promise<string> {
    // パラメーターに変換してリクエスト
    // 空のqaは落とす(サーバーでやっても良い)
    // id を返す
    return "created";
  }
}
