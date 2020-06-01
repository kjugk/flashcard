import React, { FunctionComponent, useState } from "react";

interface Props {
  qaList: {
    question: string;
    answer: string;
  }[];
}

/**
 * QA を表示,制御するコンポーネント。
 */
export const QaViewer: FunctionComponent<Props> = (props) => {
  const { qaList } = props;
  const [currentPage, changeCurrentPage] = useState(1);
  const [showAnser, toggleShowAnser] = useState(false);

  const currantQa = qaList[currentPage - 1];
  if (currantQa === undefined) {
    return null;
  }

  return (
    <div>
      <div onClick={() => toggleShowAnser(!showAnser)}>
        {!showAnser && <div>{currantQa.question}</div>}
        {showAnser && <div>{currantQa.answer}</div>}
      </div>

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => {
            toggleShowAnser(false);
            changeCurrentPage(currentPage - 1);
          }}
        >
          prev
        </button>
        <div>{`${currentPage}/${qaList.length}`}</div>
        <button
          disabled={currentPage === qaList.length}
          onClick={() => {
            toggleShowAnser(false);
            changeCurrentPage(currentPage + 1);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};
