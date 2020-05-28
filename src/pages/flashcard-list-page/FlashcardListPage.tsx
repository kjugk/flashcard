import React, { Component } from "react";
import { connect } from "react-redux";
import { getFlashcards } from "./store/actions";
import { RootState } from "../../store/rootReducer";
import { FlashcardList } from "./components/FlashcardList";

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

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

const dispatchProps = {
  getFlashcards,
};

export default connect(mapStateToProps, dispatchProps)(FlashcardListPage);
