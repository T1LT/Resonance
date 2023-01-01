import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { ModalContext } from "../../App";
import "./ChannelModal.css";
import {
  updateChannel,
  createChannel,
  deleteChannel,
} from "../../store/channel";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // height: "100%",
    // width: "100%",
    height: "240px",
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
  const { isChannelModalOpen, setIsChannelModalOpen } =
    useContext(ModalContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId } = useParams();
  const server = useSelector((store) => store.servers[serverId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // if isChannelEdit
    const channelData = {
      id: channel.id,
      channel_name: channelName,
      server_id: channel.serverId,
    };
    return dispatch(updateChannel(channelData))
      .then(() => {
        setIsChannelModalOpen(false);
        setChannelName("");
      })
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    // else
    // dispatch(createChannel(channelData));
  };
  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteChannel(channel.id))
      .then(() => {
        setIsChannelModalOpen(false);
        history.push(`/servers/${serverId}/channels/${server.defaultChannel.id}`)
        setChannelName("");
      })
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };
  return (
    <Modal
      isOpen={isChannelModalOpen}
      onRequestClose={() => setIsChannelModalOpen(false)}
      style={customStyles}
      contentLabel="Channel CRUD Modal"
      overlayClassName="Overlay"
      closeTimeoutMS={200}
    >
      <form onSubmit={handleSubmit} className="server-form">
        <h2>Edit #{channel?.channelName}</h2>
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
            autoComplete="off"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div className="server-form-footer">
        {/* conditionally render delete button */}
          <button
            type="button"
            onClick={handleDelete}
            style={{ width: "125px" }}
            id="delete-channel-button"
          >
            Delete Channel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            style={{ width: "125px" }}
          >
            Update Channel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChannelModal;