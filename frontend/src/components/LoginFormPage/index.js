import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Link, Redirect } from "react-router-dom";
import "./LoginForm.css";
import QRCode from "./QRCode";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/me" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({ credential, password })).catch(async (res) => {
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
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="media-logo">
            <center>
              <h1>Resonance</h1>
            </center>
          </div>
          <div className="above-inputs-container">
            <center>
              <h1 className="above-inputs">Welcome back!</h1>
            </center>
            <center>
              <p className="above-inputs secondary-text excited-text">
                We're so excited to see you again!
              </p>
            </center>
          </div>
          <label
            htmlFor="credential"
            className="secondary-text"
            id={errors.length ? "error-label" : undefined}
          >
            USERNAME OR EMAIL{" "}
            <span id={errors.length ? "error-label" : undefined}>
              {errors.length ? `- ${errors[0]}` : "*"}
            </span>
          </label>
          <input
            type="text"
            name="credential"
            id="credential"
            autoComplete="off"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <label
            htmlFor="password"
            className="secondary-text"
            id={errors.length ? "error-label" : undefined}
          >
            PASSWORD{" "}
            <span id={errors.length ? "error-label" : undefined}>
              {errors.length ? `- ${errors[0]}` : "*"}
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
          <button type="submit">Log In</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(login({ credential: "Demo", password: "password" }));
            }}
          >
            Demo Login
          </button>
          <p className="register-link-p secondary-text">
            Need an account?{" "}
            <Link className="register-link" to="/register">
              Register
            </Link>
          </p>
        </form>
        <div className="qrcode">
          <QRCode />
        </div>
      </div>
    </div>
  );
};

export default LoginFormPage;
