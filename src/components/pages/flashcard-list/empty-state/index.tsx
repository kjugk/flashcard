import React, { FC } from "react";
import { variables } from "../../../../styles/variables";
import { useHistory } from "react-router-dom";
import { Box, Button } from "../../../lib";
import { Title } from "../../../lib/title";
import Add from "@material-ui/icons/Add";

export const EmptyState: FC = () => {
  const history = useHistory();

  return (
    <Box
      style={{
        textAlign: "center",
        background: variables.colors.lightBlue,
        borderRadius: "6px",
        color: variables.colors.white,
      }}
    >
      <Title
        text="最初の問題集を作成しましょう"
        tag="h2"
        size="m"
        style={{ marginBottom: "24px" }}
      />
      <Button
        label="問題集を作成"
        icon={<Add fontSize="small" />}
        size="xs"
        outlined
        style={{ margin: "0 auto" }}
        onClick={() => history.push("/flashcard-create")}
      />
    </Box>
  );
};
