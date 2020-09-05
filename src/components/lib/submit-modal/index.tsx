import React, { FC } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";

import { Modal, Props as ModalProps } from "../modal";

interface Props {
  onSubmit: () => void;
}

/**
 * サブミットボタンがついたモーダル
 */
export const SubmitModal: FC<Props & ModalProps> = ({ ...rest }) => {
  return <Modal {...rest}></Modal>;
};
