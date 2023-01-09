import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchFriendships } from "../../store/friendship";
import "./UserPanel.css";
import UserPanelItem from "./UserPanelItem";

const UserPanel = ({ users }) => {
  const location = useLocation();
  const friendships = useSelector((store) => Object.values(store.friendships));
  let friendIds = friendships.map((el) => el.friend.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriendships());
  }, [dispatch]);

  return (
    <ul className="user-panel-ul">
      {location.pathname !== "/me" && (
        <div className="text-channels">
          <p>ONLINE</p>
        </div>
      )}
      {Object.values(users).map((user) => (
        <UserPanelItem
          user={user}
          key={user.id}
          friendships={friendships}
          friendIds={friendIds}
        />
      ))}
    </ul>
  );
};

export default UserPanel;
