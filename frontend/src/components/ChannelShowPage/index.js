import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannel } from "../../store/channel";
import "./ChannelShowPage.css";
import TagIcon from "@mui/icons-material/Tag";
import EditIcon from "@mui/icons-material/Edit";
import { ModalContext } from "../../App";
import ChannelModal from "../ChannelModal";

const ChannelShowPage = () => {
  const { setIsChannelModalOpen, setIsChannelEdit } = useContext(ModalContext);
  const { channelId } = useParams();
  const channel = useSelector((store) => store.channels[channelId]);
  const dispatch = useDispatch();
  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChannelEdit(true);
    setIsChannelModalOpen(true);
  };
  useEffect(() => {
    dispatch(fetchChannel(channelId));
  }, [dispatch, channelId]);
  return (
    <>
      <ChannelModal channel={channel} />
      {channel && (
        <>
          <div className="channel-info">
            <div className="channel-squircle">
              <TagIcon sx={{ transform: "skew(-10deg)", fontSize: "54px" }} />
            </div>
            <h1>Welcome to #{channel.channelName}!</h1>
            <p>This is the start of the #{channel.channelName} channel.</p>
            <div id="edit-channel" onClick={handleEditClick}>
              <EditIcon sx={{ mr: "5px", fontSize: "16px" }} />
              Edit Channel
            </div>
          </div>
          {/* message items go here */}
          <form className="message-form">
            <input
              type="text"
              name="content"
              id="message"
              placeholder={`Message #${channel.channelName}`}
            />
          </form>
        </>
      )}
    </>
  );
};

export default ChannelShowPage;
