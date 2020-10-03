import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSystemContext } from "../../../global/system/system.provider";
import { Container } from "../../lib";
import { Title } from "../../lib/title";
import { Header } from "../header";

export const NotFound: FC = () => {
  const { systemDispatch } = useSystemContext();

  useEffect(() => {
    return () => {
      systemDispatch({
        type: "system/set-not-found-error",
        payload: false,
      });
    };
  }, []);

  return (
    <div>
      <Header />
      <Container style={{ padding: "16px" }}>
        <Title
          tag="h1"
          size="xxl"
          text="お探しのページは見つかりませんでした。"
        />
        <Link to="/">トップに戻る</Link>
      </Container>
    </div>
  );
};
