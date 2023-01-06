import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { ModalContext } from "../../App";
import "./ChannelModal.css";
import { updateChannel, createChannel } from "../../store/channel";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "200px",
    width: "440px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

const ChannelModal = ({ channel }) => {
  const [channelName, setChannelName] = useState("");
  const [errors, setErrors] = useState([]);
  const {
    isChannelModalOpen,
    setIsChannelModalOpen,
    isChannelEdit,
    setIsDeleteOpen,
    setConfirmationType,
  } = useContext(ModalContext);
  const { serverId } = useParams();
  const history = useHistory();
  const server = useSelector((store) => store.servers[serverId]);
  // const channels = useSelector((store) => store.channels);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChannelEdit) {
      const channelData = {
        id: channel.id,
        channel_name: channelName,
        server_id: serverId,
      };
      updateChannel(channelData);
      setIsChannelModalOpen(false);
      setChannelName("");
    } else {
      const channelData = {
        channel_name: channelName,
        server_id: serverId,
      };
      createChannel(channelData)
        .then((channel) => history.push(`/servers/${serverId}/channels/${channel.id}`));
      setIsChannelModalOpen(false);
      setChannelName("");
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setConfirmationType("channel");
    setIsChannelModalOpen(false);
    setIsDeleteOpen(true);
  };
  return (
    <Modal
      isOpen={isChannelModalOpen}
      onRequestClose={() => {
        setIsChannelModalOpen(false);
        setErrors([]);
        setChannelName("");
      }}
      style={customStyles}
      contentLabel="Channel CRUD Modal"
      overlayClassName="Overlay"
      closeTimeoutMS={200}
    >
      <form onSubmit={handleSubmit} className="server-form">
        <h2>
          {isChannelEdit ? `Edit #${channel?.channelName}` : "Create channel"}
        </h2>
        <div className="server-form-inputs">
          <label
            htmlFor="channelName"
            className="server-name-label"
            id={errors.length ? "error-label" : undefined}
          >
            CHANNEL NAME{" "}
            <span id={errors.length ? "error-label" : undefined}>
              {errors.length ? `- ${errors[0]}` : ""}
            </span>
          </label>
          <input
            type="text"
            name="channelName"
            id="channelName"
            autoFocus
            autoComplete="off"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div className="server-form-footer">
          {isChannelEdit ? (
            <>
              {channel?.id !== server.defaultChannel.id ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  style={{ width: "125px" }}
                  id="delete-channel-button"
                >
                  Delete Channel
                </button>
              ) : (
                <button
                  type="button"
                  id="back-button"
                  onClick={() => setIsChannelModalOpen(false)}
                >
                  Back
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              id="back-button"
              onClick={() => setIsChannelModalOpen(false)}
            >
              Back
            </button>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            style={{ width: "125px" }}
          >
            {isChannelEdit ? "Update" : "Create"} Channel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChannelModal;
