import React, { useState } from "react";
import logo from "../../assets/logo.png";
import randomColor from "../../utils/logocolor";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import BlockIcon from "@mui/icons-material/Block";
import YesIcon from "@mui/icons-material/Check";
import NoIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createFriendship,
  deleteFriendship,
  updateFriendship,
} from "../../store/friendship";

const UserPanelItem = ({ user, friendIds, friendships }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [confirmType, setConfirmType] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const sessionUser = useSelector((store) => store.session.user);

  const handleYes = () => {
    if (confirmType === "remove") {
      const friendshipId = friendships.find((el) => el.friend.id === user.id).id;
      dispatch(deleteFriendship(friendshipId)).then(() => {
        setConfirmation(false);
      });
    } else {
      // find friendship
      // const friendshipData = { ...friendship, status: "blocked" }
      // dispatch(updateFriendship(friendshipData)).then(() => setConfirmation(false));
    }
  };
  const handleAddFriend = () => {
    const friendshipData = { user1_id: sessionUser.id, user2_id: user.id };
    dispatch(createFriendship(friendshipData));
  };

  return (
    <li
      key={user.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="user-panel-item-container">
        <div className="user-panel-item-left">
          <div className="user-squircle" id={randomColor(user.id)}>
            <img src={logo} alt="logo" className="user-logo" />
          </div>
          <p className="user-text">{user.username}</p>
        </div>
        {user.id !== sessionUser.id && hovered && (
          <div className="user-panel-item-right">
            {confirmation ? (
              <>
                <YesIcon fontSize="small" onClick={handleYes} />
                <NoIcon
                  fontSize="small"
                  onClick={() => setConfirmation(false)}
                />
              </>
            ) : (
              <>
                {location.pathname === "/me" || friendIds.includes(user.id) ? (
                  <PersonRemoveAlt1Icon
                    fontSize="small"
                    onClick={() => {
                      setConfirmType("remove");
                      setConfirmation(true);
                    }}
                  />
                ) : (
                  <PersonAddAlt1Icon
                    fontSize="small"
                    onClick={handleAddFriend}
                  />
                )}
                <BlockIcon
                  sx={{ fontSize: "16px", mt: "2px" }}
                  onClick={() => {
                    setConfirmType("block");
                    setConfirmation(true);
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default UserPanelItem;
