import { FlashcardListItemState } from "../../global-context/flashcard-list/flashcard-list.store";
import { FlashcardDetailState } from "../../components/pages/flashcard-detail/store";
import {
  GetFlashcardListResponse,
  GetFlashcardResponse,
  CreateFlashcardResponse,
  DeleteFlashcardResponse,
  UpdateFlashcardResponse,
} from "./response";
import { CreateFlashcardRequest, UpdateFlashcardRequest } from "./request";
import { handleErrors, getHttpClient } from "../repository-utils";

class FlashcardRepository {
  // API のデータをアプリケーションで使える形式にして返す
  async getAll(): Promise<FlashcardListItemState[]> {
    const http = await getHttpClient();

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
      return handleErrors(e);
    }
  }

  async find(id: string): Promise<FlashcardDetailState> {
    const http = await getHttpClient();

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
      return handleErrors(e);
    }
  }

  async create(request: CreateFlashcardRequest): Promise<string> {
    const http = await getHttpClient();
    // TODO 空のqaは落とす(サーバーでやっても良い)
    try {
      const response = await http.post<CreateFlashcardResponse>(
        "flashcard",
        request
      );

      return response.data.flashcard.id;
    } catch (e) {
      return handleErrors(e);
    }
  }

  async update(id: string, request: UpdateFlashcardRequest): Promise<string> {
    const http = await getHttpClient();
    try {
      const response = await http.put<UpdateFlashcardResponse>(
        `flashcards/${id}`,
        request
      );

      return response.data.flashcard.id;
    } catch (e) {
      return handleErrors(e);
    }
  }

  async delete(id: string): Promise<string> {
    const http = await getHttpClient();
    const response = await http.delete<DeleteFlashcardResponse>(
      `flashcards/${id}`
    );

    return response.data.flashcard.id;
  }
}

export const flashcardRepository = new FlashcardRepository();
