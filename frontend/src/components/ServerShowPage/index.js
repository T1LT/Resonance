import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchServer } from "../../store/server";
import ServerHeader from "./ServerHeader";
import "./ServerShowPage.css";

const ServerShowPage = () => {
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const server = useSelector((store) => store.servers[serverId]);
  useEffect(() => {
    dispatch(fetchServer(serverId));
  }, [dispatch, serverId]);

  return (
    <div className="server-show">
      {server && (
        <div className="server-parent">
          <ServerHeader server={server} />
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
