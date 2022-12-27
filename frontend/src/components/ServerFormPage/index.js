import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createServer } from '../../store/server';

const ServerFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [serverName, setServerName] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(store => store.session.user);
  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createServer({ serverName }))
      .then(() => history.push("/me"))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };
  if (!sessionUser) return <Redirect to="/login" />;
  return (
    <div className='server-form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name' className='secondary-text' id={errors.length ? "error-label" : undefined}>
          SERVER NAME{" "}
          <span id={errors.length ? "error-label" : undefined}>
            {errors.length ? `- ${errors[0]}` : ""}
          </span>
        </label>
        <input type="text" name="name" id="name" value={serverName} onChange={e => setServerName(e.target.value)} />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default ServerFormPage;