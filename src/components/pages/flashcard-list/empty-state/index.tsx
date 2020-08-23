import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "../../../lib";
import { Title } from "../../../lib/title";

export const EmptyState: FC = () => {
  const history = useHistory();

  return (
    <Box>
      <Title
        text="最初の暗記カードを作成しよう"
        tag="h2"
        size="l"
        style={{ marginBottom: "16px" }}
      />
      <Button label="作成" onClick={() => history.push("/flashcard-create")} />
    </Box>
  );
};
