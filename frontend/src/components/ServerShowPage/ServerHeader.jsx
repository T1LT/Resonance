import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { deleteServer } from "../../store/server";
import "./ServerShowPage.css";

const ServerHeader = ({ server, isOpen, setIsOpen, handleOutsideClick }) => {
  const sessionUser = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDrawerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteServer(server.id));
    history.push("/me");
  };
  return (
    <div className="server-header" onClick={handleOutsideClick}>
      <div className="header-left">
        <h4>{server.serverName}</h4>
        <div onClick={handleDrawerClick}>
          {isOpen ? (
            <CloseIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </div>
        {isOpen ? (
          <div className="menu-container">
            <ul className="menu">
              <li className="menu-item">
                <button>
                  Server Information
                  <PeopleAltIcon fontSize="small" sx={{ mt: 0, pr: 0 }} />
                </button>
              </li>
              {server.ownerId === sessionUser.id && (
                <>
                  <li className="menu-item">
                    <button>
                      Edit Server
                      <EditIcon fontSize="small" sx={{ mt: 0, pr: 0 }} />
                    </button>
                  </li>
                  <li>
                    <div className="options-divider"></div>
                  </li>
                  <li className="menu-item">
                    <button id="delete-button" onClick={handleDelete}>
                      Delete Server
                      <DeleteIcon fontSize="small" sx={{ mt: 0, pr: 0 }} />
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="rest-of-the-header"></div>
    </div>
  );
};

export default ServerHeader;
