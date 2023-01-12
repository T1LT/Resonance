import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import {
  addChannel,
  clearChannels,
  fetchChannels,
  removeChannel,
} from "../../store/channel";
import { fetchServer } from "../../store/server";
import ServerHeader from "./ServerHeader";
import "./ServerShowPage.css";
import UserPanel from "./UserPanel";
import TagIcon from "@mui/icons-material/Tag";
import AddIcon from "@mui/icons-material/Add";
import DeleteConfirmation from "../DeleteConfirmation";
import ServerFormPage from "../ServerFormPage";
import ChannelShowPage from "../ChannelShowPage";
import { ModalContext } from "../../App";
import consumer from "../consumer";

const ServerShowPage = () => {
  const { setIsChannelModalOpen, setIsChannelEdit, isDropOpen, setIsDropOpen } =
    useContext(ModalContext);
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  const server = useSelector((store) => store.servers[serverId]);
  const channels = useSelector((store) => Object.values(store.channels));
  const history = useHistory();
  const handleOutsideClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropOpen(false);
  };
  const handleCreateChannel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChannelEdit(false);
    setIsChannelModalOpen(true);
  };

  useEffect(() => {
    dispatch(clearChannels());
    dispatch(fetchServer(serverId));
    dispatch(fetchChannels(serverId));
    const subscription = consumer.subscriptions.create(
      { channel: "ServersChannel", id: serverId },
      {
        received: (channelObj) => {
          switch (channelObj.type) {
            case "RECEIVE_CHANNEL":
              dispatch(addChannel(channelObj));
              break;
            case "UPDATE_CHANNEL":
              dispatch(addChannel(channelObj));
              break;
            case "DESTROY_CHANNEL":
              dispatch(removeChannel(channelObj.id));
              if (+channelId === channelObj.id) {
                history.push(
                  `/servers/${serverId}/channels/${server.defaultChannel.id}`
                );
              }
              break;
            default:
              console.log("Unhandled broadcast: ", type);
              break;
          }
        },
      }
    );
    return () => subscription?.unsubscribe();
  }, [dispatch, serverId, channelId]);

  if (!sessionUser) return <Redirect to="/login" />;
  if (!channelId)
    return (
      <Redirect
        to={`/servers/${server.id}/channels/${server.defaultChannel.id}`}
      />
    );
  return (
    <>
      <ServerFormPage />
      <DeleteConfirmation />
      <div className="server-show" onClick={handleOutsideClick}>
        {server && (
          <div className="server-parent">
            <ServerHeader
              server={server}
              isDropOpen={isDropOpen}
              setIsDropOpen={setIsDropOpen}
              handleOutsideClick={handleOutsideClick}
            />
            <div className="panels-container">
              <div className="server-panel">
                <div className="text-channels">
                  <p>TEXT CHANNELS</p>
                  {server.ownerId === sessionUser.id && (
                    <AddIcon
                      fontSize="small"
                      onClick={handleCreateChannel}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </div>
                <ul className="channels-list">
                  {channels?.map((channel) => (
                    <li key={channel.id}>
                      <NavLink
                        to={`/servers/${server.id}/channels/${channel.id}`}
                        className="channel-item"
                        activeClassName="channel-active"
                      >
                        <TagIcon
                          sx={{ mr: "5px", transform: "skew(-10deg)" }}
                        />
                        <p className="channel-item-text truncate">
                          {channel.channelName}
                        </p>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="channel-container">
                <ChannelShowPage />
              </div>
              <div className="user-panel">
                <UserPanel users={server.users} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ServerShowPage;
