export interface FlashcardFormValues {
  name: string;
  description: string;
  qaList: {
    question: string;
    answer: string;
  }[];
}
