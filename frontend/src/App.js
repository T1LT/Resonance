import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import LoginFormPage from "./components/LoginFormPage";
import NotFound from "./components/NotFound";
import SignupFormPage from "./components/SignupFormPage";

function App() {
  useEffect(() => {
    console.log(
      "%cHold Up!",
      "color: #5865F2; font-size: 72px; text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;"
    );
    console.log(
      "%cIf someone told you to copy/paste something here you have an 11/10 chance you're being scammed.",
      "color: white; font-size: 15px"
    );
    console.log(
      "%cPasting anything in here could give attackers access to your Resonance account.",
      "color: red; font-size: 20px; font-weight: bold"
    );
    console.log(
      "%cIf you do understand exactly what you are doing, you should hire me! https://www.linkedin.com/in/nishant-racherla-a51370167/",
      "color: white; font-size: 15px"
    );
  }, []);
  return (
    <>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={LoginFormPage} />
        <Route path="/register" component={SignupFormPage} />
        <Route path="/error" component={NotFound} />
        <Redirect to="/error" />
      </Switch>
    </>
  );
}

export default App;
