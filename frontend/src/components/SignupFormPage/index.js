import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.signUp({ email, username, tag, password })
    ).catch(async (res) => {
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
    <div className="form-parent">
      <div className="register-form-container">
        <form onSubmit={handleSubmit} className="register-form">
          {/* SHOW ERRORS WITH LABEL */}
          {/* <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul> */}
          <center>
            <h1 className="register-heading">Create an account</h1>
          </center>
          <label htmlFor="email" className="secondary-text">
            EMAIL
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="username" className="secondary-text">
            USERNAME
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="tag" className="secondary-text">
            TAG
          </label>
          <input
            type="text"
            name="tag"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
          <label htmlFor="password" className="secondary-text">
            PASSWORD
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Continue</button>
          <Link to="/login" className="register-link">
            Already have an account?
          </Link>
          <p style={{ fontSize: "12px", marginTop: "20px" }}>
            By registering, you agree to Resonance's{" "}
            <a
              href="https://discord.com/terms"
              target="_blank"
              className="register-link tos"
              noreferrer
              noopener
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://discord.com/privacy"
              target="_blank"
              className="register-link tos"
              noreferrer
              noopener
            >
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupFormPage;
