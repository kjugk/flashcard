import React, { FC, useState } from "react";
import styled from "styled-components";
import { TextButton } from "../../../lib/text-button";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { Popover } from "../../../lib/popover";
import { ConfirmableModal } from "../../../lib/confirmable-modal";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export const Controller: FC<Props> = ({ onEdit, onDelete }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const handleClickDeleteButton = () => setShowDeleteConfirmModal(true);
  const closeDeleteConfirmModal = () => setShowDeleteConfirmModal(false);

  return (
    <>
      <div style={{ textAlign: "right", position: "relative" }}>
        <TextButton onClick={() => setShowPopover(true)} disabled={false}>
          <MoreHoriz style={{ fontSize: 28 }} />
        </TextButton>

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
        onSubmit={onDelete}
      />
    </>
  );
};

const List = styled.ul`
  padding: 24px;
  li {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    line-height: 1.2;
    &:last-child {
      margin-bottom: 0px;
    }
    .icon {
      margin-right: 16px;
    }
  }
`;
