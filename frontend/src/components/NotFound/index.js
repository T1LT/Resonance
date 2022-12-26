import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>WRONG TURN?</h1>
      <p>
        You look lost, stranger. You know what helps when you're lost? A piping
        hot bowl of noodles. Take a seat, we're frantically at work here cooking
        up something good. Oh, you need something to read? These might help you:
      </p>
      <ul className="error-ul">
        <li>
          <a href="/" target="_blank">
            Portfolio
          </a>
        </li>
        <li>
          <a href="https://github.com/T1LT/Resonance" target="_blank">
            Github Repo
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/nishant-racherla-a51370167/"
            target="_blank"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NotFound;
