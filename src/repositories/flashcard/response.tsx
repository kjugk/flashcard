export interface GetFlashcardListResponse {
  flashcards: {
    id: string;
    name: string;
    qaList: [
      {
        question: string;
        answer: string;
      }
    ];
    description: string;
    createdAt: number;
    updatedAt: number;
  }[];
}

export interface GetFlashcardResponse {
  flashcard: {
    id: string;
    name: string;
    qaList: [
      {
        question: string;
        answer: string;
      }
    ];
    description: string;
    createdAt: number;
    updatedAt: number;
  };
}

export interface CreateFlashcardResponse {
  flashcard: {
    id: string;
  };
}

export interface UpdateFlashcardResponse {
  flashcard: {
    id: string;
  };
}

export interface DeleteFlashcardResponse {
  flashcard: {
    id: string;
  };
}
