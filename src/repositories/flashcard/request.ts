export interface CreateFlashcardRequest {
  name: string;
  description: string;
  qaList: {
    question: string;
    answer: string;
  }[];
}

export interface UpdateFlashcardRequest {
  name: string;
  description: string;
  qaList: {
    question: string;
    answer: string;
  }[];
}
