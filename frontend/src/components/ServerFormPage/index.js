import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ServerForm from "./ServerForm";
import "./ServerFormPage.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "320px",
    width: "440px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
  },
};

Modal.setAppElement("#root");

const ServerFormPage = ({ isEdit, isOpen, setIsOpen }) => {
  const sessionUser = useSelector((store) => store.session.user);
  if (!sessionUser) return <Redirect to="/login" />;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Add Server Modal"
      overlayClassName="Overlay"
      closeTimeoutMS={200}
    >
      <ServerForm isEdit={isEdit} setIsOpen={setIsOpen} />
    </Modal>
  );
};

export default ServerFormPage;
