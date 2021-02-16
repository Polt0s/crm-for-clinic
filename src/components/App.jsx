import React from 'react';
import '../style/app.css';
import { connect } from 'react-redux';
import { filling, openRegistrationForm, openInputForm } from '../actions/index.js';
import RegistationForm from './Registration.jsx';
import InputForm from './Input.jsx';

const mapStateToProps = ({ switching }) => {
  const props = { switching };
  return props;
};

const App = ({ dispatch, switching }) => {

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

  const renderFormInput = () => {
    return (
      <InputForm backToForm={handleBackToForm} />
    );
  }

  const renderFormCheckIn = () => {
    return (
      <RegistationForm backToForm={handleBackToForm} />
    );
  }

  const renderButton = () => {
    return (
      <div id="registration" className="container-fluid d-flex justify-content-center">
        <button type="button" className="btn btn-info btn-lg" id="buttonInput" onClick={handleClickInputForm}>Вход</button>
        <button type="button" className="btn btn-info btn-lg" id="buttonCheckIn" onClick={handleClickCheckInForm}>Регистрация</button>
      </div>
    );
  }

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
}

export default connect(mapStateToProps)(App);
