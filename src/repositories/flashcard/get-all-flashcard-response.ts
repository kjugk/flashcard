export interface GetAllFlashcardResponse {
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
