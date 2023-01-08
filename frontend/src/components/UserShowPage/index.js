import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchFriendships } from "../../store/friendship";
import ServerFormPage from "../ServerFormPage";
import UserPanel from "../ServerShowPage/UserPanel";
import "./UserShowPage.css";

const UserShowPage = () => {
  const sessionUser = useSelector((store) => store.session.user);
  const friendships = useSelector((store) => Object.values(store.friendships));
  const dispatch = useDispatch();
  const friends = friendships.map(el => el.friend);

  useEffect(() => {
    dispatch(fetchFriendships());
  }, [dispatch]);

  if (!sessionUser) <Redirect to="/login" />;
  return (
    <>
      <ServerFormPage />
      <div className="user-show">
        <UserPanel users={friends} />
      </div>
    </>
  );
};

export default UserShowPage;
