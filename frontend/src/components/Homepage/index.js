import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session';

const Homepage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(store => store.session.user);
  const handleClick = e => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </ul>
      {sessionUser && <button onClick={handleClick}>Log Out</button>}
    </div>
  );
}

export default Homepage;