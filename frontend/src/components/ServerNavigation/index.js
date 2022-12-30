import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import { fetchServers } from "../../store/server";
import "./ServerNavigation.css";
import logo from "../../assets/logo.png";
import { ModalContext } from "../../App";

const ServerNavigation = () => {
  const { setIsEdit, setIsOpen } = useContext(ModalContext);
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
              <NavLink to="/me" className="squircle purple-boi">
                <li>
                  <img src={logo} alt="logo" className="logo-icon" />
                  <div className="popper-boi">
                    <h4 className="popper-text">Home</h4>
                  </div>
                </li>
              </NavLink>
              <li className="divider"></li>
              {Object.values(servers)?.map((server) => (
                <NavLink
                  to={`/servers/${server.id}`}
                  key={server.id}
                  className="squircle purple-boi"
                >
                  <li>
                    <p>{server.serverName[0]}</p>
                    <div className="popper-boi">
                      <h4 className="popper-text">{server.serverName}</h4>
                    </div>
                  </li>
                </NavLink>
              ))}
              <li
                className="squircle green-boi"
                onClick={() => {
                  setIsOpen(true);
                  setIsEdit(false);
                }}
              >
                <p className="plus-minus">+</p>
                <div className="popper-boi">
                  <h4 className="popper-text">Add Server</h4>
                </div>
              </li>
              <li
                className="squircle green-boi"
                onClick={() => dispatch(logout())}
              >
                <p className="plus-minus">-</p>
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
