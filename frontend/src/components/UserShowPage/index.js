import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login, logout } from "../../store/session";
import "./UserShowPage.css"

const UserShowPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  return (
    <div>
      {sessionUser && (
        <>
          <h2>Welcome {sessionUser.username + "#" + sessionUser.tag}!</h2>
          <button onClick={() => dispatch(logout())}>Log Out</button>
          <h1>Servers</h1>
          <ul>
            {Object.values(sessionUser?.servers).map((server) => (
              <li key={server.id}>{server.server_name}</li>
            ))}
          </ul>
        </>
      )}
      {!sessionUser && <Redirect to="/login" />}
    </div>
  );
}

export default UserShowPage