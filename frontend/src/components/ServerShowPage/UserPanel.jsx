import React from "react";
import logo from "../../assets/logo.png";
import randomColor from "../../utils/logocolor";
import "./UserPanel.css";

const UserPanel = ({ users }) => {
  return (
    <ul className="user-panel-ul">
      {/* add onClick drop down here */}
      {Object.values(users).map((user) => (
        <li key={user.id}>
          <div className="user-squircle" id={randomColor(user.id)}>
            <img src={logo} alt="logo" className="user-logo" />
          </div>
          <p className="user-text">{user.username}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserPanel;
