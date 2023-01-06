import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ServerFormPage from "../ServerFormPage";
import "./UserShowPage.css";

const UserShowPage = () => {
  const sessionUser = useSelector((store) => store.session.user);
  return (
    <>
      <ServerFormPage />
      <div className="user-show">
        {sessionUser ? (
          <h1>
            {sessionUser.username}#{sessionUser.tag}
          </h1>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    </>
  );
};

export default UserShowPage;
