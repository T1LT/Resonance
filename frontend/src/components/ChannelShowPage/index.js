import React, { useEffect, useContext, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannel } from "../../store/channel";
import "./ChannelShowPage.css";
import TagIcon from "@mui/icons-material/Tag";
import EditIcon from "@mui/icons-material/Edit";
import { ModalContext } from "../../App";
import ChannelModal from "../ChannelModal";
import {
  addMessage,
  clearMessages,
  createMessage,
  fetchMessages,
  removeMessage,
} from "../../store/message";
import MessageItem from "../MessageItem";
import consumer from "../consumer";
import randomColor from "../../utils/logocolor";
import logo from "../../assets/logo.png";

const useChatScroll = (dep) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
};

const ChannelShowPage = () => {
  const { setIsChannelModalOpen, setIsChannelEdit } = useContext(ModalContext);
  const { serverId, channelId } = useParams();
  const [body, setBody] = useState("");
  const server = useSelector((store) => store.servers[serverId]);
  const channel = useSelector((store) => store.channels[channelId]);
  const messages = useSelector((store) => Object.values(store.messages));
  const sessionUser = useSelector((store) => store.session.user);
  const dmUser = channel?.dmUser;
  const dispatch = useDispatch();
  const ref = useChatScroll(messages);
  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChannelEdit(true);
    setIsChannelModalOpen(true);
  };
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = {
      sender_id: sessionUser.id,
      channel_id: channel.id,
      body,
    };
    createMessage(message);
    setBody("");
  };

  useEffect(() => {
    dispatch(clearMessages());
    dispatch(fetchMessages(serverId, channelId));
    dispatch(fetchChannel(channelId));
    const subscription = consumer.subscriptions.create(
      { channel: "ChannelsChannel", id: channelId },
      {
        received: (messageObj) => {
          switch (messageObj.type) {
            case "RECEIVE_MESSAGE":
              dispatch(addMessage(messageObj));
              break;
            case "UPDATE_MESSAGE":
              dispatch(addMessage(messageObj));
              break;
            case "DESTROY_MESSAGE":
              dispatch(removeMessage(messageObj.id));
              break;
            default:
              console.log("Unhandled broadcast: ", type);
              break;
          }
        },
      }
    );
    return () => subscription?.unsubscribe();
  }, [dispatch, channelId]);

  return (
    <div className={serverId ? undefined : "dm-container"}>
      {channel && (
        <>
          <ChannelModal channel={channel} />
          <div className="channel-main" ref={ref}>
            <div className="channel-info">
              {serverId ? (
                <>
                  <div className="channel-squircle">
                    <TagIcon
                      sx={{ transform: "skew(-10deg)", fontSize: "54px" }}
                    />
                  </div>
                  <h1>Welcome to #{channel.channelName}!</h1>
                  <p className="channel-intro-grey">
                    This is the start of the #{channel.channelName} channel.
                  </p>
                  <div id="edit-channel" onClick={handleEditClick}>
                    <EditIcon sx={{ mr: "5px", fontSize: "16px" }} />
                    Edit Channel
                  </div>
                </>
              ) : (
                <>
                  <div className="channel-squircle" id={randomColor(dmUser.id)}>
                    <img src={logo} alt="logo" className="user-logo-large" />
                  </div>
                  <h1>{dmUser.username}</h1>
                  <p className="dm-intro-msg channel-intro-grey">
                    This is the beginning of your direct message history with{" "}
                    <strong>@{dmUser.username}</strong>
                  </p>
                </>
              )}
            </div>
            <div className="messages-container">
              {messages?.map((message, idx) => (
                <MessageItem key={idx} server={server} message={message} />
              ))}
            </div>
          </div>
          <form className="message-form" onSubmit={handleMessageSubmit}>
            <input
              type="text"
              name="content"
              id="message"
              autoComplete="off"
              placeholder={
                serverId
                  ? `Message #${channel.channelName}`
                  : `Message @${dmUser.username}`
              }
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default ChannelShowPage;
