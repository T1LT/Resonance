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
    .filter((el) => el.status !== "blocked" && el.status !== "pending")
    .map((el) => el.friend);
  const blockedIds = friendships
    .filter((el) => el.status === "blocked")
    .map((el) => el.friend.id);
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
        ? Object.values(friends).map((user, idx) => (
            <UserPanelItem
              user={user}
              key={idx}
              friendships={friendships}
              friendIds={friendIds}
              blockedIds={blockedIds}
            />
          ))
        : Object.values(users).map((user, idx) => (
            <UserPanelItem
              user={user}
              key={idx}
              friendships={friendships}
              friendIds={friendIds}
              blockedIds={blockedIds}
            />
          ))}
    </ul>
  );
};

export default UserPanel;
