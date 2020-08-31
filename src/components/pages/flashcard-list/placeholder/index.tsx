import React, { FC } from "react";
import styled from "styled-components";
import { Box } from "../../../lib/box";
import { variables } from "../../../../styles/variables";

export const FlashcardListPlaceholder: FC = () => (
  <List>
    {[1, 2, 3, 4].map((i) => (
      <ListItem key={i}>
        <Box>
          <div className="title">title</div>
          <div className="description">description</div>
        </Box>
      </ListItem>
    ))}
  </List>
);

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

  .title {
    color: ${variables.colors.lightGrey};
    background: ${variables.colors.lightGrey};
    font-size: ${variables.fontSize.xl};
    margin-bottom: 16px;
  }

  .description {
    color: ${variables.colors.lightGrey};
    background: ${variables.colors.lightGrey};
    font-size: ${variables.fontSize.m};
    margin-right: 32px;
  }
`;
