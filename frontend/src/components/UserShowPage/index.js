import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../store/session";
import "./UserShowPage.css"

const UserShowPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  return (
    <div>
      {!sessionUser && <Redirect to="/login" />}
      {sessionUser && (
        <div className="user-content">
          <h2>Welcome {sessionUser.username + "#" + sessionUser.tag}!</h2>
          <button onClick={() => dispatch(logout())}>Log Out</button>
          <h1>Servers</h1>
          <ul className="servers-list">
            {Object.values(sessionUser?.servers).map((server) => (
              <li key={server.id}>
                <Link to={`/servers/${server.id}`}>{server.server_name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserShowPage;