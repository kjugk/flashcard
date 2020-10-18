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
      <Header showUser={false} />
      <StyledContainer tag="main">
        <Grid>
          <GridText>
            <Title
              tag="h1"
              size="xxl"
              text="記憶力を高める最も簡単な方法"
              style={{ marginBottom: "16px" }}
            />
            <p>
              flashcard
              は、独自の問題集を簡単に作成し、学習できるアプリケーションです。
            </p>
            <TopButtonWrapper>
              <Button
                onClick={() => history.push("/sign-in")}
                label="早速使ってみる (無料)"
              />
            </TopButtonWrapper>
          </GridText>

          <div>
            <GridImage src="/eyecatch.png" alt="アイキャッチ画像" />
          </div>

          <BottomButtonWrapper>
            <Button
              onClick={() => history.push("/sign-in")}
              fullWidth
              label="早速使ってみる (無料)"
            />
          </BottomButtonWrapper>
        </Grid>
      </StyledContainer>

      <Footer>
        <Container>
          <FooterItem>
            &copy;{" "}
            <a href="https://twitter.com/kjugk1222" rel="nofollow">
              kjugk
            </a>{" "}
            {dayjs().year()}
          </FooterItem>
          <FooterItem>
            <a href="/terms">利用規約</a>
          </FooterItem>
          <FooterItem>
            <a href="/privacy">プライバシーポリシー</a>
          </FooterItem>
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
  padding: 16px;
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
    grid-template-columns: 1fr 360px;

    img {
      width: 360px;
      height: 360px;
    }
  }
`;

const GridText = styled.div`
  padding-top: 16px;
  @media only screen and (min-width: 768px) {
    padding-top: 32px;
`;

const GridImage = styled.img`
  max-width: 100%;
`;

const TopButtonWrapper = styled.div`
  margin-top: 32px;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const BottomButtonWrapper = styled.div`
  text-align: center;
  margin: 48px 0;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const Footer = styled.div`
  background: ${variables.colors.white};
  padding: 16px;
  font-size: ${variables.fontSize.s};
`;

const FooterItem = styled.span`
  margin-right: 8px;
`;
