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
  async getAll(): Promise<GetFlashcardListResponse> {
    const http = await getHttpClient();

    try {
      const response = await http.get<GetFlashcardListResponse>("flashcards");
      return response.data;
    } catch (e) {
      return handleErrors(e);
    }
  }

  async find(id: string): Promise<GetFlashcardResponse> {
    const http = await getHttpClient();

    try {
      const response = await http.get<GetFlashcardResponse>(`flashcards/${id}`);
      return response.data;
    } catch (e) {
      return handleErrors(e);
    }
  }

  async create(request: CreateFlashcardRequest): Promise<string> {
    const http = await getHttpClient();
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
