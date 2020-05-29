import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { FlashcardList } from "./components/FlashcardList";
import { getFlashcards } from "./effects";
import { ThunkDispatch } from "redux-thunk";
import { FlashcardListPageActionTypes } from "./store/types";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchProps>;

class FlashcardListPage extends Component<Props> {
  componentDidMount() {
    this.props.getFlashcards();
  }

  render() {
    return (
      <div>
        <h1>List Page</h1>
        <FlashcardList items={this.props.flashcards} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { flashcards } = state.flashcardListPage;
  return {
    flashcards,
  };
};

const mapDispatchProps = (
  dispatch: ThunkDispatch<RootState, unknown, FlashcardListPageActionTypes>
) => ({
  getFlashcards: () => {
    dispatch(getFlashcards());
  },
});

export default connect(mapStateToProps, mapDispatchProps)(FlashcardListPage);
