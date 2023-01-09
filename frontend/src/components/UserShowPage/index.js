import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchFriendships } from "../../store/friendship";
import ServerFormPage from "../ServerFormPage";
import UserPanel from "../ServerShowPage/UserPanel";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "./UserShowPage.css";
import ChannelShowPage from "../ChannelShowPage";
import FriendsShowPage from "./FriendsShowPage";

const UserShowPage = () => {
  const sessionUser = useSelector((store) => store.session.user);
  const friendships = useSelector((store) => Object.values(store.friendships));
  const dispatch = useDispatch();
  const friends = friendships.map((el) => el.friend);
  const [friendTab, setFriendTab] = useState("online");

  useEffect(() => {
    dispatch(fetchFriendships());
  }, [dispatch]);

  if (!sessionUser) <Redirect to="/login" />;
  return (
    <>
      <ServerFormPage />
      <div className="server-header user-show-header">
        <div className="header-left user-show-header-left">
          <h4 className="truncate">Friends</h4>
        </div>
        <div className="rest-of-the-header">
          <div className="channel-name divider-width">
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
            {/* <>
              <AlternateEmailIcon sx={{ mr: "5px", opacity: "0.5" }} />
              <h4>{"<friend name here>"}</h4>
            </> */}
          </div>
        </div>
      </div>
      <div className="user-show">
        <div className="friends-panel-container">
          <div className="text-channels">
            <p>DIRECT MESSAGES</p>
          </div>
          <UserPanel users={friends} />
        </div>
        <div className="friends-info">
          <FriendsShowPage friendTab={friendTab} />
        </div>
        {/* <ChannelShowPage /> */}
      </div>
    </>
  );
};

export default UserShowPage;
