import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppRegistration from './registrationForm/AppRegistration.jsx';
import RegistationForm from './registrationForm/RegistrationForm.jsx';
import PasswordRecoveryStart from './registrationForm/PasswordRecoveryStart.jsx';
import InputForm from './registrationForm/InputForm.jsx';
import Test from './text.jsx';

const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  // const dispatch = useDispatch();
  return (
    <Router>
      {/* <AppRegistration /> */}
      {!isAuth
        && <div>
          <Switch>
            <Route exact path="/" component={AppRegistration} />
            <Route path="/login" component={InputForm} />
            <Route path="/menu" component={Test} />
            {/* <Route path="/registration" component={RegistationForm} /> */}
          </Switch>
        </div>
      }
    </Router>
  );
};

export default App;
