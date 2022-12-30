import React from "react";
import logo from "../../assets/logo.png";
import "./UserPanel.css";

const UserPanel = ({ server }) => {
  const colors = ["blue", "mustard", "red", "green", "grey"];
  const randomColor = (id) => colors[id % 5];
  return (
    <ul className="user-panel-ul">
      {/* add onClick drop down here */}
      {Object.values(server.users).map((user) => (
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
