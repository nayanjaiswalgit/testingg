import React, { useState } from "react";
import "./Modal.scss";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/actions/modalDrawerActions";
import { isModalOpenSelector } from "../../store/selectors/modalDrawerSelector";

const InputModal = ({ id, children, ...props }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => isModalOpenSelector(state, id));

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => dispatch(closeModal(id))}
      okText={"Save"}
      {...props}
    >
      <div className="ant-modaldata-wrapper">{children}</div>
    </Modal>
  );
};

export default InputModal;
