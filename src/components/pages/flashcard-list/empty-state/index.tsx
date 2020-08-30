import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "../../../lib";
import { Title } from "../../../lib/title";

export const EmptyState: FC = () => {
  const history = useHistory();

  return (
    <Box style={{ textAlign: "center" }}>
      <Title
        text="最初の暗記カードを作成しよう"
        tag="h2"
        size="xl"
        style={{ marginBottom: "24px" }}
      />
      <Button
        label="カード作成"
        size="xs"
        onClick={() => history.push("/flashcard-create")}
      />
    </Box>
  );
};
