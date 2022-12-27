import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { fetchServers } from "../../store/server";
import "./ServerNavigation.css";

const ServerNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const servers = useSelector((store) => store.servers);
  const sessionUser = useSelector((store) => store.session.user);
  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchServers());
    }
  }, [dispatch, sessionUser]);
  return (
    <>
      {sessionUser && (
        <div className="user-content">
          <div className="servers-list">
            <div>
              <span onClick={() => history.push("/me")}>
                <NavLink to={"me"} className="bubble">
                  X
                </NavLink>
              </span>
            </div>
            <div className="line"></div>
            {Object.values(servers)?.map((server) => (
              <div key={server.id}>
                <span onClick={() => history.push(`/servers/${server.id}`)}>
                  <NavLink to={`/servers/${server.id}`} className="bubble">
                    {server.serverName[0]}
                  </NavLink>
                </span>
              </div>
            ))}
            <div>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  history.push("/servers/new");
                }}
                className="bubble"
              >
                +
              </span>
            </div>
            <div>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(logout());
                }}
                className="bubble"
              >
                -
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServerNavigation;
