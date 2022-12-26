import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../../store/session';

const Homepage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(store => store.session.user);
  return (
    <div>
      <h1>Homepage</h1>
      {sessionUser && (
        <>
          <h2>Welcome {sessionUser.username + "#" + sessionUser.tag}!</h2>
          <button onClick={() => dispatch(logout())}>Log Out</button>
        </>
      )}
      {!sessionUser && (
        <button
          onClick={() =>
            dispatch(login({ credential: "Demo", password: "password" }))
          }
        >
          Demo Login
        </button>
      )}
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}

export default Homepage;