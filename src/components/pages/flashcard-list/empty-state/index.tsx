import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "../../../lib";

export const EmptyState: FC = () => {
  const history = useHistory();

  return (
    <Box>
      <h2>最初の暗記カードを作成しよう</h2>
      <Button label="作成" onClick={() => history.push("/flashcard-create")} />
    </Box>
  );
};
