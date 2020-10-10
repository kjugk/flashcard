import { FlashcardListItemState } from "../../components/pages/flashcard-list/store";
import { FlashcardDetail } from "../../components/pages/flashcard-detail/store";
import axios from "axios";
import {
  GetFlashcardListResponse,
  GetFlashcardResponse,
  CreateFlashcardResponse,
  DeleteFlashcardResponse,
  UpdateFlashcardResponse,
} from "./response";
import { CreateFlashcardRequest, UpdateFlashcardRequest } from "./request";
import { getCognitoIdToken } from "../../lib/cognito";
import { NotFoundError, NetworkError, NotAuthorizedError } from "../../errors";

class FlashcardRepository {
  // API のデータをアプリケーションで使える形式にして返す
  async getAll(): Promise<FlashcardListItemState[]> {
    const http = await this.getHttpClient();

    try {
      const response = await http.get<GetFlashcardListResponse>("flashcards");
      const { flashcards } = response.data;

      // TODO Reducer に移動
      return flashcards.map((flashcard) => {
        return {
          name: flashcard.name,
          id: flashcard.id,
          description: flashcard.description,
          createdAt: flashcard.createdAt,
        };
      });
    } catch (e) {
      return this.handleErrors(e);
    }
  }

  async find(id: string): Promise<FlashcardDetail> {
    const http = await this.getHttpClient();

    try {
      const response = await http.get<GetFlashcardResponse>(`flashcards/${id}`);
      const { flashcard } = response.data;

      return {
        id: flashcard.id,
        name: flashcard.name,
        description: flashcard.description,
        qaList: flashcard.qaList,
      };
    } catch (e) {
      return this.handleErrors(e);
    }
  }

  async create(request: CreateFlashcardRequest): Promise<string> {
    const http = await this.getHttpClient();
    // TODO 空のqaは落とす(サーバーでやっても良い)
    try {
      const response = await http.post<CreateFlashcardResponse>(
        "flashcard",
        request
      );

      return response.data.flashcard.id;
    } catch (e) {
      return this.handleErrors(e);
    }
  }

  async update(id: string, request: UpdateFlashcardRequest): Promise<string> {
    const http = await this.getHttpClient();
    try {
      const response = await http.put<UpdateFlashcardResponse>(
        `flashcards/${id}`,
        request
      );

      return response.data.flashcard.id;
    } catch (e) {
      return this.handleErrors(e);
    }
  }

  async delete(id: string): Promise<string> {
    const http = await this.getHttpClient();
    const response = await http.delete<DeleteFlashcardResponse>(
      `flashcards/${id}`
    );

    return response.data.flashcard.id;
  }

  private handleErrors = (e: any): never => {
    if (!!e.isAxiosError && !e.response) {
      throw new NetworkError();
    }

    switch (e.response.status) {
      case 401:
        throw new NotAuthorizedError();
      case 404:
        throw new NotFoundError();
      default:
        throw new Error();
    }
  };

  private getHttpClient = async () => {
    const token = await getCognitoIdToken();
    return axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: { Authorization: token },
    });
  };
}

export const flashcardRepository = new FlashcardRepository();
