import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./UserShowPage.css"

const UserShowPage = () => {
  const sessionUser = useSelector((store) => store.session.user);
  return (
    <div className="user-show">
      {!sessionUser && <Redirect to="/login" />}
      <h1>User Show</h1>
    </div>
  );
};

export default UserShowPage;
