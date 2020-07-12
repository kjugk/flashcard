export interface FlashcardDetail {
  id: string;
  name: string;
  description: string;
  qaList: {
    question: string;
    answer: string;
  }[];
}
