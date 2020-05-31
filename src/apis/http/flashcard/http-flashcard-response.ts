export interface FlashcardGetAllResponse {
  flashcards: {
    id: string;
    name: string;
  }[];
}

export interface FlashcardFindResponse {
  flashcard: {
    id: string;
    name: string;
  };
}
