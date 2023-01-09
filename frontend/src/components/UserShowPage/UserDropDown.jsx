import React from "react";

const UserDropDown = ({ user }) => {
  return (
    <div className="menu-container m-scene avoid-border">
      <ul className="menu scene_element scene_element--fadeinup">
        {/* <li className="menu-item">
          <button>Add Friend</button>
        </li> */}
        <li className="menu-item">
          <button>Remove Friend</button>
        </li>
        <li className="menu-item">
          <button>Block</button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropDown;
