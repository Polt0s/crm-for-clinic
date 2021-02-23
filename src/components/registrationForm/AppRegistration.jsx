import React, { useEffect } from 'react';
import './app.css';
import { connect } from 'react-redux';
import { filling, openRegistrationForm, openInputForm } from '../../actions/index.js';
import RegistationForm from './RegistrationForm.jsx';
import InputForm from './InputForm.jsx';
import auth from '../../actions/authentication.js';

const mapStateToProps = ({ switching, user: { isAuth } }) => {
  const props = { switching, isAuth };
  return props;
};

const AppRegistration = ({ dispatch, switching, isAuth }) => {
  useEffect(() => {
    dispatch(auth);
  }, []);

  const handleClickCheckInForm = (event) => {
    event.preventDefault();
    dispatch(openRegistrationForm());
  };

  const handleClickInputForm = (event) => {
    event.preventDefault();
    dispatch(openInputForm());
  };

  const handleBackToForm = (event) => {
    event.preventDefault();
    dispatch(filling());
  };

  const renderFormInput = () => (
    <InputForm backToForm={handleBackToForm} />
  );

  const renderFormCheckIn = () => (
    <RegistationForm backToForm={handleBackToForm} />
  );

  const renderButton = () => (
    <div id="registration" className="container-fluid d-flex justify-content-center">
      {
        !isAuth
        && <>
          <button type="button" className="btn btn-info btn-lg" id="buttonInput" onClick={handleClickInputForm}>Sign in</button>
          <button type="button" className="btn btn-info btn-lg" id="buttonCheckIn" onClick={handleClickCheckInForm}>Sign up</button>
        </>
      }
    </div>
  );

  switch (switching) {
    case 'filling':
      return renderButton();
    case 'openRegistrationForm':
      return renderFormCheckIn();
    case 'openInputForm':
      return renderFormInput();
    default:
      throw new Error(`'${switching}' - unknown state`);
  }
};

export default connect(mapStateToProps)(AppRegistration);
