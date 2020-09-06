import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../shared/header";
import { Container } from "../../lib/container";
import { FlashcardForm } from "../../shared/flashcard-form";
import { FlashcardFormValues } from "../../../global/flashcard/types";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";

/**
 * カード編集ページ。
 */
export const FlashcardEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<
    FlashcardFormValues | undefined
  >(undefined);

  const getFlashcardDetail = async () => {
    try {
      setLoading(true);
      const item = await flashcardRepository.find(id);
      setDefaultValues({
        name: item.name,
        description: item.description,
        qaList: item.qaList,
      });
    } catch {
      // TODO コンテンツ置き換えるだけにする
      alert("not found");
    } finally {
      setLoading(false);
    }
  };

  const updateFlashcard = async (values: FlashcardFormValues) => {
    console.log(values);
  };

  useEffect(() => {
    getFlashcardDetail();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Header />
      <Container>
        <FlashcardForm
          defaultValues={defaultValues}
          onSubmit={updateFlashcard}
        />
      </Container>
    </div>
  );
};
