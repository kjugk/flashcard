import { FlashcardListItem } from "../../types/flashcard-list-item";
import { FlashcardDetail } from "../../types/flashcard-detail";
import axios from "axios";
import { GetAllFlashcardResponse } from "./get-all-flashcard-response";
import { GetFlashcardResponse } from "./get-flashcard-response";
import { CreateFlashcardRequest } from "./create-flashcard-request";
import { CreateFlashcardResponse } from "./create-flashcard-response";
import { DeleteFlashcardResponse } from "./delete-flashcard-response";
import { getCognitoIdToken } from "../../lib/cognito";

class FlashcardRepository {
  // API のデータをアプリケーションで使える形式にして返す
  async getAll(): Promise<FlashcardListItem[]> {
    const http = await this.getHttpClient();
    const response = await http.get<GetAllFlashcardResponse>("flashcards");
    const { flashcards } = response.data;

    return flashcards.map((flashcard) => {
      return {
        name: flashcard.name,
        id: flashcard.id,
      };
    });
  }

  async find(id: string): Promise<FlashcardDetail> {
    const http = await this.getHttpClient();
    const response = await http.get<GetFlashcardResponse>(`flashcards/${id}`);
    const { flashcard } = response.data;

    return {
      id: flashcard.id,
      name: flashcard.name,
      description: flashcard.description,
      qaList: flashcard.qaList,
    };
  }

  async create(request: CreateFlashcardRequest): Promise<string> {
    const http = await this.getHttpClient();
    // TODO 空のqaは落とす(サーバーでやっても良い)
    const response = await http.post<CreateFlashcardResponse>(
      "flashcard",
      request
    );
    const { flashcard } = response.data;

    return flashcard.id;
  }

  async delete(id: string): Promise<string> {
    const http = await this.getHttpClient();
    const response = await http.delete<DeleteFlashcardResponse>(
      `flashcards/${id}`
    );
    const { flashcard } = response.data;

    return flashcard.id;
  }

  // 他の repository が出てきたら共通化する
  private getHttpClient = async () => {
    const token = await getCognitoIdToken();
    return axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: { Authorization: token },
    });
  };
}

export const flashcardRepository = new FlashcardRepository();
