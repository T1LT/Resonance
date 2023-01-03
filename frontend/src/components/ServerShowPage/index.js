import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channel";
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

const ServerShowPage = () => {
  const {
    setIsChannelModalOpen,
    setIsChannelEdit,
    setConfirmationType,
    setIsDeleteOpen,
  } = useContext(ModalContext);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [isChannelDropOpen, setisChannelDropOpen] = useState(false);
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  const server = useSelector((store) => store.servers[serverId]);
  const channels = useSelector((store) => Object.values(store.channels));
  useEffect(() => {
    dispatch(fetchServer(serverId));
    dispatch(fetchChannels(serverId));
  }, [dispatch, serverId]);
  const handleOutsideClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropOpen(false);
    setisChannelDropOpen(false);
  };
  const handleCreateChannel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChannelEdit(false);
    setIsChannelModalOpen(true);
  };
  
  // const handleChannelRightClick = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log(e);
  //   setisChannelDropOpen(true);
  // };
  /* {isChannelDropOpen && (
        <div className="menu-container">
          <ul className="menu">
            <li className="menu-item">
              <button id="invite-button" onClick={() => {
                setIsChannelEdit(true);
                setIsChannelModalOpen(true);
              }}>Edit Channel</button>
            </li>
            <li>
              <div className="options-divider"></div>
            </li>
            <li className="menu-item" onClick={() => {
              setConfirmationType("channel");
              setIsDeleteOpen(true);
            }}>
              <button id="delete-button">Delete Channel</button>
            </li>
          </ul>
        </div>
      )} 
  */

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
                <UserPanel server={server} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ServerShowPage;
