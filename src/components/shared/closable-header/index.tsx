import React, { FC } from "react";
import Close from "@material-ui/icons/Close";
import styled from "styled-components";
import { Container } from "../../lib/container";
import { Title } from "../../lib/title";
import { IconButton } from "../../lib/icon-button";
import { variables } from "../../../styles/variables";
import { useHistory, Link } from "react-router-dom";

interface Props {
  title: string;
}

export const ClosableHeader: FC<Props> = ({ title }) => {
  const history = useHistory();

  return (
    <StyledHeader>
      <Container style={{ padding: "0 16px" }}>
        <Content>
          <Link to="/flashcard-list" style={{ flex: 1 }}>
            <Title text={title} tag="h1" size="xxl" />
          </Link>
          <IconButton
            icon={<Close />}
            color="white"
            onClick={() => history.goBack()}
          />
        </Content>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: ${variables.colors.lightBlue};
  color: ${variables.colors.white};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  padding: 12px 0;
`;

const Content = styled.nav`
  display: flex;
  align-items: center;
`;
