import React, { FC } from "react";
import styled from "styled-components";
import { variables } from "../../../../styles/variables";
import { useHistory } from "react-router-dom";
import { Button } from "../../../lib";
import { Title } from "../../../lib/title";
import Add from "@material-ui/icons/Add";

export const EmptyState: FC = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Image src="/empty-state.png" width="360px" alt="empty state image" />
      <Title
        text="まだ問題集がありません"
        tag="h2"
        size="l"
        style={{ marginBottom: "16px" }}
      />
      <Paragraph>
        学習したい課題について、最初の問題集を作成してみましょう!
      </Paragraph>
      <Button
        label="問題集を作成する"
        icon={<Add />}
        size="s"
        outlined
        onClick={() => history.push("/flashcard-create")}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  margin-top: 48px;
  padding 0 16px;
`;

const Image = styled.img`
  width: min(360px, 100%);
  margin-bottom: 48px;
`;

const Paragraph = styled.p`
  color: ${variables.colors.darkGrey};
  font-size: ${variables.fontSize.s};
  margin-bottom: 36px;
`;
