import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Homepage from "./components/Homepage";
import LoginFormPage from "./components/LoginFormPage";
import NotFound from "./components/NotFound";
import ServerFormPage from "./components/ServerFormPage";
import ServerNavigation from "./components/ServerNavigation";
import ServerShowPage from "./components/ServerShowPage";
import SignupFormPage from "./components/SignupFormPage";
import UserShowPage from "./components/UserShowPage";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
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
    <div className="main-app">
      <ServerNavigation setIsEdit={setIsEdit} setIsOpen={setIsOpen} />
      <ServerFormPage isEdit={isEdit} isOpen={isOpen} setIsOpen={setIsOpen} />
      <DeleteConfirmation isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={LoginFormPage} />
        <Route path="/register" component={SignupFormPage} />
        <Route path="/me" component={UserShowPage} />
        <Route path="/servers/:serverId">
          <ServerShowPage setIsOpen={setIsOpen} setIsEdit={setIsEdit} setIsDeleteOpen={setIsDeleteOpen} />
        </Route>
        <Route path="/error" component={NotFound} />
        <Redirect to="/error" />
      </Switch>
    </div>
  );
}

export default App;
