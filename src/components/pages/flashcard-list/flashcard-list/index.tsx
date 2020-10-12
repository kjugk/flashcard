import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FlashcardListItemState } from "../../../../global/flashcard-list/flashcard-list.store";
import { Title } from "../../../lib/title";
import { variables } from "../../../../styles/variables";
import Schedule from "@material-ui/icons/Schedule";
import { numberToDateString } from "../../../../lib/utils/date-util";

interface Props {
  items: FlashcardListItemState[];
}

export const FlashcardList: FunctionComponent<Props> = (props) => (
  <List>
    {props.items.map((item) => (
      <ListItem key={item.id}>
        <Link to={`/flashcard-detail/${item.id}`}>
          <Title
            tag="div"
            size="l"
            text={item.name}
            ellipsis
            style={{
              marginBottom: "12px",
            }}
          />
          <div className="description">{item.description}</div>

          <ListBottomContainer>
            <div className="date">
              <Schedule
                className="icon"
                style={{ fontSize: variables.fontSize.l }}
              />
              {numberToDateString(item.createdAt)}
            </div>
          </ListBottomContainer>
        </Link>
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
  padding: 24px 16px;
  background: ${variables.colors.white};
  border-radius: 6px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08),
    0px 1px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 12px;
  overflow: hidden;

  .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ListBottomContainer = styled.div`
  display: flex;
  margin-top: 20px;

  .date {
    color: ${variables.colors.darkGrey};
    display: flex;
    line-height: 1;
    align-items: center;
    .icon {
      margin-right: 6px;
    }
  }
`;
