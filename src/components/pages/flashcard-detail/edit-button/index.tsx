import React, { CSSProperties, FC, useState } from "react";
import styled from "styled-components";
import { variables } from "../../../../styles/variables";
import { IconButton } from "../../../lib/icon-button";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { Popover } from "../../../lib/popover";
import { ConfirmableModal } from "../../../lib/confirmable-modal";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";

interface Props {
  style: CSSProperties;
  onEdit: () => void;
  onDelete: () => void;
}

export const EditButton: FC<Props> = ({ onEdit, onDelete, style }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const handleClickDeleteButton = () => setShowDeleteConfirmModal(true);
  const closeDeleteConfirmModal = () => setShowDeleteConfirmModal(false);

  return (
    <>
      <div style={style}>
        <IconButton icon={<MoreHoriz />} onClick={() => setShowPopover(true)} />
        <Popover show={showPopover} onClose={() => setShowPopover(false)}>
          <List>
            <li role="menuItem" onClick={onEdit}>
              <Create className="icon" />
              <span>編集</span>
            </li>
            <li
              onClick={handleClickDeleteButton}
              role="menuItem"
              style={{ color: "red" }}
            >
              <Delete className="icon" />
              <span>削除</span>
            </li>
          </List>
        </Popover>
      </div>

      <ConfirmableModal
        show={showDeleteConfirmModal}
        title="削除しますがよろしいですか"
        description="一度削除したものは復元出来ません"
        submitLabel="削除"
        onClose={closeDeleteConfirmModal}
        onCancel={closeDeleteConfirmModal}
        onSubmit={() => {
          setShowDeleteConfirmModal(false);
          onDelete();
        }}
      />
    </>
  );
};

const List = styled.ul`
  padding: 24px;
  width: 124px;
  font-size: ${variables.fontSize.m};
  li {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0px;
    }
    .icon {
      margin-right: 16px;
    }
  }
`;
