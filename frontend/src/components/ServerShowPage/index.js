import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { fetchServer } from "../../store/server";
import ServerHeader from "./ServerHeader";
import "./ServerShowPage.css";
import UserPanel from "./UserPanel";

const ServerShowPage = () => {
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
            isDropOpen={isDropOpen}
            setIsDropOpen={setIsDropOpen}
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
              <UserPanel server={server} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerShowPage;
