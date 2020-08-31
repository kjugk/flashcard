import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FlashcardListItem } from "../store";
import { Box } from "../../../lib/box";
import { Title } from "../../../lib/title";

interface Props {
  items: FlashcardListItem[];
}

export const FlashcardList: FunctionComponent<Props> = (props) => {
  return (
    <List>
      {props.items.map((item) => (
        <ListItem key={item.id}>
          <Link to={`/flashcard-detail/${item.id}`}>
            <Box>
              <Title
                tag="div"
                size="l"
                text={item.name}
                style={{ marginBottom: "16px" }}
              />
              <div>{item.description}</div>
            </Box>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 12px;
  }
`;

const ListItem = styled.li`
  margin-bottom: 16px;
`;
