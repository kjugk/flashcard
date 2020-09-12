import React, { FC } from "react";
import styled from "styled-components";
import { Modal, Props as ModalProps } from "../modal";
import { Title } from "../title";
import { Button } from "../button";

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  submitLabel: string;
  cancelLabel?: string;
}

export const ConfirmableModal: FC<Props & ModalProps> = ({
  onSubmit,
  onCancel,
  title,
  description,
  submitLabel,
  cancelLabel = "キャンセル",
  ...rest
}) => {
  return (
    <Modal show={rest.show} onClose={rest.onClose}>
      <div>
        <Title
          text={title}
          tag="h2"
          size="xl"
          style={{ marginBottom: "16px" }}
        />
        <div>{description}</div>
        <ModalController>
          <Button label={cancelLabel} outlined onClick={onCancel} />
          <Button label={submitLabel} onClick={onSubmit} />
        </ModalController>
      </div>
    </Modal>
  );
};

const ModalController = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  margin-top: 26px;
`;
