import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';

function App() {
  return (
    <>
      {/* <Navigation /> */}
      <Switch>
        {/* <Route exact path="/" component={Homepage} /> */}
        <Route path="/login" component={LoginFormPage} />
        <Route path="/register" component={SignupFormPage} />
      </Switch>
    </>
  );
}

export default App;
