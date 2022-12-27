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
        <div className="navbar">
          <nav>
            <ul className="squircles">
              <NavLink to="/me">
                <li className="squircle purple-boi">
                  <p>X</p>
                  <div className="popper-boi">
                    <h4 className="popper-text">Home</h4>
                  </div>
                </li>
              </NavLink>
              <li className="divider"></li>
              {Object.values(servers)?.map(server => (
                <NavLink to={`/servers/${server.id}`} key={server.id}>
                  <li className="squircle purple-boi">
                    <p>{server.serverName[0]}</p>
                    <div className="popper-boi">
                      <h4 className="popper-text">{server.serverName}</h4>
                    </div>
                  </li>
                </NavLink>
              ))}
              <NavLink to="/servers/new">
                <li className="squircle green-boi">
                    <p>+</p>
                    <div className="popper-boi">
                      <h4 className="popper-text">Add Server</h4>
                    </div>
                </li>
              </NavLink>
              <li className="squircle green-boi" onClick={() => dispatch(logout())}>
                <p>-</p>
                <div className="popper-boi">
                  <h4 className="popper-text">Logout</h4>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default ServerNavigation;
