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
import { writeToConsole } from "./utils/consolemessages";

export const ModalContext = createContext();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLeave, setIsLeave] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [isChannelEdit, setIsChannelEdit] = useState(true);
  const [confirmationType, setConfirmationType] = useState("server");
  useEffect(() => {
    writeToConsole();
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
          isChannelModalOpen,
          setIsChannelModalOpen,
          isChannelEdit,
          setIsChannelEdit,
          confirmationType,
          setConfirmationType
        }}
      >
        <ServerNavigation />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={LoginFormPage} />
          <Route exact path="/register" component={SignupFormPage} />
          <Route exact path="/me" component={UserShowPage} />
          <Route
            exact
            path="/servers/:serverId/channels/:channelId"
            component={ServerShowPage}
          />
          <Route exact path="/servers/:serverId" component={ServerShowPage} />
          <Route exact path="/invite/:hash" component={Invite} />
          <Route exact path="/error" component={NotFound} />
          <Redirect to="/error" />
        </Switch>
      </ModalContext.Provider>
    </div>
  );
}

export default App;
