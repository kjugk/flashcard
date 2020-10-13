import React, { FC, createContext, useContext, Dispatch } from "react";
import {
  FlashcardListPageAction,
  FlashcardListPageState,
  useListPageReducer,
} from "./flashcard-list.store";

interface IContextProps {
  flashcardListPageState: FlashcardListPageState;
  flashcardLisrPageDispatch: Dispatch<FlashcardListPageAction>;
}
const FlashcardListPageContext = createContext({} as IContextProps);

export const FlashcardListPageProvider: FC = (props) => {
  const [
    flashcardListPageState,
    flashcardLisrPageDispatch,
  ] = useListPageReducer();

  return (
    <FlashcardListPageContext.Provider
      value={{
        flashcardListPageState,
        flashcardLisrPageDispatch,
      }}
    >
      {props.children}
    </FlashcardListPageContext.Provider>
  );
};

// custome hooks
export const useFlashcardListPageContext = () =>
  useContext(FlashcardListPageContext);
