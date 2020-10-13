import React, { FC } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";
import { useHistory } from "react-router-dom";
import { Button, Container } from "../../lib";
import { Title } from "../../lib/title";
import { Header } from "../../shared";
import dayjs from "dayjs";

export const TopPage: FC = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Header />
      <StyledContainer tag="main">
        <Grid>
          <GridText>
            <Title tag="h1" size="xxl" text="記憶力を高める最も簡単な方法" />
            <p style={{ marginBottom: "32px" }}>
              flashcard
              は、独自の問題集を簡単に作成し、学習できるアプリケーションです。
            </p>
            <Button
              onClick={() => history.push("/sign-in")}
              label="早速使ってみる (無料)"
            />
          </GridText>

          <div>
            <Image src="/640.png" />
          </div>
        </Grid>
      </StyledContainer>

      <Footer>
        <Container>
          <div>&copy; Koji Uegaki {dayjs().year()}</div>
        </Container>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled(Container)`
  flex: 1;
  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Grid = styled.div`
  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 320px;
  }
`;

const GridText = styled.div`
  padding-top: 32px;
`;

const Image = styled.img`
  max-width: 320px;
`;

const Footer = styled.div`
  // background: ${variables.colors.black};
  // color: ${variables.colors.white};
  background: ${variables.colors.white};
  text-align: right;
  padding: 16px 0;
`;
