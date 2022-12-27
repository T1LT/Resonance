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

  if (sessionUser) return <Redirect to="/me" />;

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

  const findError = (error) => {
    const regex = new RegExp(error);
    let found = errors.find(e => e.match(regex));
    return found ? ("- " + found) : "";
  };

  return (
    <div className="form-parent">
      <div className="register-form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-media-logo">
            <center>
              <h1>Resonance</h1>
            </center>
          </div>
          <center>
            <h1 className="register-heading">Create an account</h1>
          </center>
          <label
            htmlFor="email"
            className="secondary-text"
            id={findError("Email") !== "" ? "error-label" : undefined}
          >
            EMAIL{" "}
            <span id={findError !== "" ? "error-label": undefined}>
              {errors.length ? findError("Email") : ""}
            </span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="username"
            className="secondary-text"
            id={findError("Username") !== "" ? "error-label" : undefined}
          >
            USERNAME{" "}
            <span id={errors.length && "error-label"}>
              {errors.length ? findError("Username") : ""}
            </span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label
            htmlFor="tag"
            className="secondary-text"
            id={findError("Tag") !== "" ? "error-label" : undefined}
          >
            TAG{" "}
            <span id={errors.length ? "error-label" : undefined}>
              {errors.length ? findError("Tag") : ""}
            </span>
          </label>
          <input
            type="text"
            name="tag"
            id="tag"
            maxLength="4"
            autoComplete="off"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
          <label
            htmlFor="password"
            className="secondary-text"
            id={findError("Password") !== "" ? "error-label" : undefined}
          >
            PASSWORD{" "}
            <span id={errors.length ? "error-label" : undefined}>
              {errors.length ? findError("Password") : ""}
            </span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
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
              noreferrer="true"
              noopener="true"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://discord.com/privacy"
              target="_blank"
              className="register-link tos"
              noreferrer="true"
              noopener="true"
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
