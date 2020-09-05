import { FlashcardListItem } from "../../components/pages/flashcard-list/store";
import { FlashcardDetail } from "../../components/pages/flashcard-detail/store";
import axios from "axios";
import { GetAllFlashcardResponse } from "./response/get-all-flashcard-response";
import { GetFlashcardResponse } from "./response/get-flashcard-response";
import { CreateFlashcardRequest } from "./create-flashcard-request";
import { CreateFlashcardResponse } from "./response/create-flashcard-response";
import { DeleteFlashcardResponse } from "./response/delete-flashcard-response";
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
        description: flashcard.description,
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

  private getHttpClient = async () => {
    const token = await getCognitoIdToken();
    return axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: { Authorization: token },
    });
  };
}

export const flashcardRepository = new FlashcardRepository();
