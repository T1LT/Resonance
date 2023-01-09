import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchFriendships } from "../../store/friendship";
import "./UserPanel.css";
import UserPanelItem from "./UserPanelItem";

const UserPanel = ({ users }) => {
  const location = useLocation();
  const friendships = useSelector((store) => Object.values(store.friendships));
  const sessionUser = useSelector((store) => store.session.user);
  const friends = friendships
    .filter((el) => (el.status !== "blocked" && el.status !== "pending"))
    .map((el) => el.friend);
  let friendIds = friendships.map((el) => el.friend.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUser) dispatch(fetchFriendships());
  }, [dispatch]);

  return (
    <ul className="user-panel-ul">
      {location.pathname !== "/me" && (
        <div className="text-channels">
          <p>ONLINE</p>
        </div>
      )}
      {!users
        ? Object.values(friends).map((user) => (
            <UserPanelItem
              user={user}
              key={user.id}
              friendships={friendships}
              friendIds={friendIds}
            />
          ))
        : Object.values(users).map((user) => (
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
