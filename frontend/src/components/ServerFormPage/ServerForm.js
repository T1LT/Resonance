import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createServer } from "../../store/server";
import "./ServerFormPage.css";

const ServerForm = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((store) => store.session.user);
  const [serverName, setServerName] = useState(
    `${sessionUser.username}'s Server`
  );
  const [errors, setErrors] = useState([]);
  const handleSubmit = (e) => {
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
  return (
    <div className="server-form">
      <form onSubmit={handleSubmit}>
        <div className="server-form-header">
          <h2>Customize your server</h2>
          <center>
            <p>
              Give your server a personality with a name. You can always change
              it later.
            </p>
          </center>
        </div>
        <div className="server-form-inputs">
          <label
            htmlFor="name"
            className="server-name-label"
            id={errors.length ? "error-label" : undefined}
          >
            SERVER NAME{" "}
            <span id={errors.length ? "error-label" : undefined}>
              {errors.length ? `- ${errors[0]}` : ""}
            </span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
          <p style={{ fontSize: "12px", marginTop: 0 }}>
            By creating a server, you agree to Resonance's{" "}
            <a
              href="https://discord.com/guidelines"
              target="_blank"
              className="register-link tos"
              noreferrer="true"
              noopener="true"
              style={{ color: "#0068E0" }}
            >
              <strong>Community Guidelines</strong>
            </a>
          </p>
        </div>
        <div className="server-form-footer">
          <button id="back-button" onClick={() => setIsOpen(false)}>Back</button>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default ServerForm;
