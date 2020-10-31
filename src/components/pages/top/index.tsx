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
    <Page>
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

          <EyeCatchWrapper>
            <EyeCatch>
              <img src="/eyecatch.png" alt="eyecatch image" width="360" />
            </EyeCatch>
          </EyeCatchWrapper>

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
    </Page>
  );
};

const Page = styled.div`
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
  }
`;

const GridText = styled.div`
  padding-top: 16px;
  @media only screen and (min-width: 768px) {
    padding-top: 48px;
`;

const EyeCatchWrapper = styled.div`
  width: min(100%, 360px);
  position: relative;
  margin 0 auto;
`;

const EyeCatch = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
  }
`;

const TopButtonWrapper = styled.div`
  margin-top: 32px;
  display: none;
  @media only screen and (min-width: 768px) {
    display: block;
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
