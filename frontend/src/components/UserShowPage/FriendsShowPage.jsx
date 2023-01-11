import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendsShowItem from "./FriendsShowItem";
import consumer from "../consumer";
import { addFriendship, removeFriendship } from "../../store/friendship";
import { useHistory } from "react-router-dom";

const FriendsShowPage = ({ sessionUser, friendTab, friendships, friends }) => {
  const dispatch = useDispatch();
  const sessionUserId = sessionUser?.id;
  const history = useHistory();
  if (!sessionUserId) history.push("/login");
  
  const onlineFriends = friends.filter(
    (el) =>
      el.friend.status === "online" &&
      el.status !== "blocked" &&
      el.status !== "pending"
  );
  const allFriends = friends.filter(
    (el) => el.status !== "pending" && el.status !== "blocked"
  );
  const pendingFriends = friends.filter(
    (el) => el.status === "pending" && el.status !== "blocked"
  );
  const blockedFriends = friends.filter((el) => el.status === "blocked");
  
  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: "FriendshipsChannel", id: sessionUserId },
      {
        received: (friendshipObj) => {
          switch (friendshipObj.type) {
            case "RECEIVE_FRIENDSHIP":
              dispatch(addFriendship(friendshipObj));
              break;
            case "DESTROY_FRIENDSHIP":
              dispatch(removeFriendship(friendshipObj.id));
              break;
            case "UPDATE_FRIENDSHIP":
              dispatch(addFriendship(friendshipObj));
              break;
            default:
              console.log("Unhandled broadcast: ", friendshipObj.type);
              break;
          }
        },
      }
    );
    return () => subscription?.unsubscribe();
  }, [sessionUserId, dispatch]);

  if (friendTab === "online") {
    return (
      <div className="friend-show-main">
        <div className="user-text-channels">
          <p>ONLINE &#8212; {onlineFriends.length}</p>
        </div>
        <ul>
          {onlineFriends.map((friendObj, idx) => (
            <FriendsShowItem
              friendTab={friendTab}
              friendObj={friendObj}
              key={idx}
              friendships={friendships}
            />
          ))}
        </ul>
        <div className="options-divider" id="user-divider"></div>
      </div>
    );
  } else if (friendTab === "all") {
    return (
      <div className="friend-show-main">
        <div className="user-text-channels">
          <p>ALL FRIENDS &#8212; {allFriends.length}</p>
        </div>
        <ul>
          {allFriends.map((friendObj, idx) => (
            <FriendsShowItem
              friendTab={friendTab}
              friendObj={friendObj}
              key={idx}
              friendships={friendships}
            />
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
            <FriendsShowItem
              friendTab={friendTab}
              friendObj={friendObj}
              key={idx}
              friendships={friendships}
            />
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
            <FriendsShowItem
              friendTab={friendTab}
              friendObj={friendObj}
              key={idx}
              friendships={friendships}
            />
          ))}
        </ul>
        <div className="options-divider" id="user-divider"></div>
      </div>
    );
  }
};

export default FriendsShowPage;
