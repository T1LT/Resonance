import React from "react";
import { useSelector } from "react-redux";
import FriendsShowItem from "./FriendsShowItem";
// import UserDropDown from "./UserDropDown";

const FriendsShowPage = ({ friendTab }) => {
  const friendships = useSelector((store) => Object.values(store.friendships));
  const friends = friendships.map((el) => ({
    friend: el.friend,
    status: el.status,
  }));
  const onlineFriends = friends.filter(
    (el) =>
      el.friend.status === "online" &&
      el.status !== "blocked" &&
      el.status !== "pending"
  );
  const allFriends = friends.filter(
    (el) => el.status !== "blocked" && el.status !== "pending"
  );
  const pendingFriends = friends.filter(
    (el) => el.status === "pending" && el.status !== "blocked"
  );
  const blockedFriends = friends.filter((el) => el.status === "blocked");
  if (friendTab === "online") {
    return (
      <div className="friend-show-main">
        <div className="user-text-channels">
          <p>ONLINE &#8212; {onlineFriends.length}</p>
        </div>
        <ul>
          {onlineFriends.map((friendObj, idx) => (
            <FriendsShowItem friend={friendObj.friend} key={idx} />
          ))}
        </ul>
        <div className="options-divider" id="user-divider"></div>
      </div>
    );
  } else if (friendTab === "all") {
    return (
      <div className="friend-show-main">
        <div className="user-text-channels">
          <p>ALL FRIENDS &#8212; {friends.length}</p>
        </div>
        <ul>
          {allFriends.map((friendObj, idx) => (
            <FriendsShowItem friend={friendObj.friend} key={idx} />
          ))}
        </ul>
        <div className="options-divider" id="user-divider"></div>
      </div>
    );
  } else if (friendTab === "pending") {
    return (
      <div className="friend-show-main">
        <div className="user-text-channels">
          <p>PENDING &#8212; {pendingFriends.length}</p>
        </div>
        <ul>
          {pendingFriends.map((friendObj, idx) => (
            <FriendsShowItem friend={friendObj.friend} key={idx} />
          ))}
        </ul>
        <div className="options-divider" id="user-divider"></div>
      </div>
    );
  } else {
    return (
      <div className="friend-show-main">
        <div className="user-text-channels">
          <p>BLOCKED &#8212; {blockedFriends.length}</p>
        </div>
        <ul>
          {blockedFriends.map((friendObj, idx) => (
            <FriendsShowItem friend={friendObj.friend} key={idx} />
          ))}
        </ul>
        <div className="options-divider" id="user-divider"></div>
      </div>
    );
  }
};

export default FriendsShowPage;
