import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import ServerFormPage from "../ServerFormPage";
import UserPanel from "../ServerShowPage/UserPanel";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "./UserShowPage.css";
import FriendsShowPage from "./FriendsShowPage";
import ChannelShowPage from "../ChannelShowPage";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DeleteConfirmation from "../DeleteConfirmation";

const UserShowPage = () => {
  const { channelId } = useParams();
  const sessionUser = useSelector((store) => store.session.user);
  const channel = useSelector((store) => store.channels[channelId]);
  const friendships = useSelector((store) => Object.values(store.friendships));
  const friends = friendships.map((el) => ({
    friend: el.friend,
    status: el.status,
    friendshipId: el.id,
    dmChannel: el.dmChannel
  }));
  const notiCount = friends.filter(
    (el) => el.status === "pending" && !el.friend.user1Id
  ).length;
  const [friendTab, setFriendTab] = useState("online");
  if (!sessionUser) <Redirect to="/login" />;
  return (
    <>
      <ServerFormPage />
      <DeleteConfirmation />
      <div className="server-header user-show-header">
        <div className="header-left user-show-header-left">
          <h4 className="truncate">Friends</h4>
        </div>
        <div className="rest-of-the-header">
          <div className="channel-name divider-width">
            {channelId ? (
              <>
                <AlternateEmailIcon sx={{ mr: "5px", opacity: "0.5" }} />
                <h4>{channel?.dmUser.username}</h4>
              </>
            ) : (
              <>
                <PeopleAltIcon sx={{ mr: "10px", opacity: "0.6" }} />
                <h4>Friends</h4>
                <div className="vertical-divider">&nbsp;</div>
                <ul className="friend-options">
                  <li>
                    <button
                      className="friend-option-button"
                      id={
                        friendTab === "online"
                          ? "friend-option-active"
                          : undefined
                      }
                      onClick={() => setFriendTab("online")}
                    >
                      Online
                    </button>
                  </li>
                  <li>
                    <button
                      className="friend-option-button"
                      id={
                        friendTab === "all" ? "friend-option-active" : undefined
                      }
                      onClick={() => setFriendTab("all")}
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      className="friend-option-button"
                      id={
                        friendTab === "pending"
                          ? "friend-option-active"
                          : undefined
                      }
                      onClick={() => setFriendTab("pending")}
                    >
                      Pending
                      {!!notiCount && (
                        <span className="noti-count">{notiCount}</span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      className="friend-option-button"
                      id={
                        friendTab === "blocked"
                          ? "friend-option-active"
                          : undefined
                      }
                      onClick={() => setFriendTab("blocked")}
                    >
                      Blocked
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="user-show">
        <div className="friends-panel-container">
          <div className="text-channels">
            <p>DIRECT MESSAGES</p>
          </div>
          <UserPanel />
        </div>
        <div className="friends-info">
          {channelId ? (
            <ChannelShowPage />
          ) : (
            <FriendsShowPage
              friendTab={friendTab}
              sessionUser={sessionUser}
              friendships={friendships}
              friends={friends}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserShowPage;
