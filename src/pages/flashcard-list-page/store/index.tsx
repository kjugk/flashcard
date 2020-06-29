import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";
import React, { createContext, useReducer, useContext, Dispatch } from "react";

// actions
export type FlashcardListPageAction =
  | { type: "update-loading"; payload: boolean }
  | { type: "store-flashcards"; payload: FlashcardListItem[] }
  | { type: "update-list-is-dirty"; payload: boolean };

// State types
interface FlashcardListPageState {
  isDirty: boolean;
  isLoading: boolean;
  flashcards: FlashcardListItem[];
}

const initialState: FlashcardListPageState = {
  isLoading: false,
  isDirty: true,
  flashcards: [],
};

// reducer
function reducer(
  state: FlashcardListPageState,
  action: FlashcardListPageAction
): FlashcardListPageState {
  switch (action.type) {
    case "update-loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "store-flashcards":
      return {
        ...state,
        flashcards: action.payload,
        isLoading: false,
        isDirty: false,
      };

    case "update-list-is-dirty":
      return {
        ...state,
        isDirty: action.payload,
      };
  }
}

interface IContextProps {
  state: FlashcardListPageState;
  dispatch: Dispatch<FlashcardListPageAction>;
}

const ListContext = createContext({} as IContextProps);
export const ListProvider: React.FunctionComponent = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ListContext.Provider>
  );
};

export const useList = () => useContext(ListContext);
