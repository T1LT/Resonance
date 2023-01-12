import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { fetchServers } from "../../store/server";
import "./ServerNavigation.css";
import logo from "../../assets/logo.png";
import ExploreIcon from "@mui/icons-material/Explore";
import { ModalContext } from "../../App";

const ServerNavigation = () => {
  const { setIsEdit, setIsOpen, setIsDropOpen } = useContext(ModalContext);
  const dispatch = useDispatch();
  const servers = useSelector((store) => store.servers);
  const sessionUser = useSelector((store) => store.session.user);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchServers());
    }
  }, [dispatch, sessionUser]);
  if (location.pathname === "/") return null;
  return (
    <>
      {sessionUser && (
        <div className="navbar" onClick={() => setIsDropOpen(false)}>
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
                    <p>{server.serverName[0].toUpperCase()}</p>
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
                onClick={() => history.push("/")}
              >
                <p className="plus-minus">
                  <ExploreIcon />
                </p>
                <div className="popper-boi">
                  <h4 className="popper-text">Homepage</h4>
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
