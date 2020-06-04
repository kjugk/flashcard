import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { FlashcardCreateForm } from "./components/flashcard-create-form";
import { createFlashcard } from "./effects";
import { Header } from "../../shared/components/header/header";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/root-reducer";
import { IFlashcardCreateForm } from "./store/types";
import { connect } from "react-redux";
import { AnyAction } from "redux";

type Props = ReturnType<typeof mapDispatchProps>;

/**
 * カード作成ページ。
 */
const FlashcardCreatePage: FunctionComponent<Props> = (props) => {
  const history = useHistory();

  return (
    <div>
      <Header />
      <h1>Create Page</h1>
      <FlashcardCreateForm
        onSubmit={async (values) => {
          const id = await props.createFlashcard(values);
          history.push(`/flashcard-detail/${id}`);
        }}
      />
    </div>
  );
};

const mapDispatchProps = (
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>
) => ({
  createFlashcard: (form: IFlashcardCreateForm) =>
    dispatch(createFlashcard(form)),
});

export default connect(null, mapDispatchProps)(FlashcardCreatePage);
