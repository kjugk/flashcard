import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FlashcardListItem } from "../store";
import { Box } from "../../../lib/box";
import { variables } from "../../../../styles/variables";

interface Props {
  items: FlashcardListItem[];
}

export const FlashcardList: FunctionComponent<Props> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <ListItem key={item.id}>
          <Link to={`/flashcard-detail/${item.id}`}>
            <Box>
              <div className="name">{item.name}</div>
              <div>{item.description}</div>
            </Box>
          </Link>
        </ListItem>
      ))}
    </ul>
  );
};

const ListItem = styled.li`
  margin-bottom: 16px;
  .name {
    font-weight: bold;
    font-size: ${variables.fontSize.l};
    margin-bottom: 16px;
  }
`;
