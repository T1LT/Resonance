import { useEffect, useState, createContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Invite from "./components/Invite";
import LoginFormPage from "./components/LoginFormPage";
import NotFound from "./components/NotFound";
import ServerNavigation from "./components/ServerNavigation";
import ServerShowPage from "./components/ServerShowPage";
import SignupFormPage from "./components/SignupFormPage";
import UserShowPage from "./components/UserShowPage";

export const ModalContext = createContext();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLeave, setIsLeave] = useState(false);
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
      <ModalContext.Provider
        value={{
          isOpen,
          setIsOpen,
          isEdit,
          setIsEdit,
          isDeleteOpen,
          setIsDeleteOpen,
          isLeave,
          setIsLeave,
        }}
      >
        <ServerNavigation />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={LoginFormPage} />
          <Route path="/register" component={SignupFormPage} />
          <Route path="/me" component={UserShowPage} />
          <Route
            path="/servers/:serverId/channels/:channelId"
            component={ServerShowPage}
          />
          <Route path="/servers/:serverId" component={ServerShowPage} />
          <Route path="/invite/:hash" component={Invite} />
          <Route path="/error" component={NotFound} />
          <Redirect to="/error" />
        </Switch>
      </ModalContext.Provider>
    </div>
  );
}

export default App;
