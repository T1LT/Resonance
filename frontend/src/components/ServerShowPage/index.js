import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createMembership, fetchServer } from "../../store/server";
import ServerHeader from "./ServerHeader";
import "./ServerShowPage.css";

const ServerShowPage = ({ setIsOpen, setIsEdit }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  const server = useSelector((store) => store.servers[serverId]);
  useEffect(() => {
    dispatch(fetchServer(serverId));
  }, [dispatch, serverId]);
  const handleOutsideClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropOpen(false);
  };

  if (!sessionUser) return <Redirect to="/login" />;
  return (
    <div className="server-show" onClick={handleOutsideClick}>
      {server && (
        <div className="server-parent">
          <ServerHeader
            server={server}
            setIsOpen={setIsOpen}
            isDropOpen={isDropOpen}
            setIsDropOpen={setIsDropOpen}
            setIsEdit={setIsEdit}
            handleOutsideClick={handleOutsideClick}
          />
          <div className="panels-container">
            <div className="server-panel">
              <p># general</p>
              <p># memes</p>
              <p># testing</p>
            </div>
            <div className="channel-container">
              <h1>Channel Component Here</h1>
            </div>
            <div className="user-panel">
              <ul>
                {Object.values(server.users).map((user) => (
                  <li key={user.id}>
                    <strong>{user.username}</strong> #{user.tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerShowPage;
