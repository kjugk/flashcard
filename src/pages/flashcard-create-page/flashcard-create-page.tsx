import React, { FunctionComponent } from "react";
import { FlashcardCreateForm } from "./components/flashcard-create-form";

// type Props = ReturnType<typeof mapStateToProps> &
//   ReturnType<typeof mapDispatchProps>;

/**
 * カード作成ページ。
 */
const FlashcardCreatePage: FunctionComponent = () => {
  return (
    <div>
      <h1>Create Page</h1>
      <FlashcardCreateForm
        onSubmit={(values) => {
          console.log(values);
        }}
      />
    </div>
  );
};

// const mapStateToProps = (state: RootState) => {
//   const { flashcards } = state.flashcardListPage;
//   return {
//     flashcards,
//   };
// };

// const mapDispatchProps = (
//   dispatch: ThunkDispatch<RootState, unknown, FlashcardCreatePageActionTypes>
// ) => ({
//   getFlashcards: () => {
//     dispatch(getFlashcards());
//   },
// });

// export default connect(mapStateToProps)(FlashcardCreatePage);
export default FlashcardCreatePage;
