import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, NavLink, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import * as yup from 'yup';
import './registration.css';
import InputElements from './InputElements.jsx';
import Test from '../text.jsx';
import sendingLoginData from '../../serverRequests/sendingLogin.js';
import PasswordRecoveryStart from './PasswordRecoveryStart.jsx';

const InputForm = () => {
  // const { backToForm, backToRegistration } = props;
  const dispatch = useDispatch();
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const [isSubmit, changeSubmit] = useState('filling');
  const [isErrorMessage, changeErrorMessage] = useState('');

  const handleShow = (e) => {
    e.preventDefault();
    changeShowHidePassword(!showHidePassword);
  };

  const handleSubmit = () => {
    changeSubmit('submitted');
  };

  const handleClickForgotPassword = () => {
    changeSubmit('submittedFormRecoveryPassword');
  };

  const renderMainMenu = () => (
    <Test />
  );

  const renderPasswordRecoveryStart = () => (
    <PasswordRecoveryStart />
  );

  const render = () => (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={
        yup.object({
          email: yup.string().email('Invalid email format').required('You have not entered your email'),
          password: yup.string().min(8).max(127).required('You did not enter your password'),
        })
      }
      onSubmit={(values) => {
        const { email, password } = values;
        dispatch(sendingLoginData(email, password))
          .then((response) => {
            if (response.status === 'FAIL') {
              changeErrorMessage(response.message);
            } else {
              handleSubmit();
            }
          });
      }}
      validateOnMount
    >
      {(formik) => (
        <Form id="formInput">
          {/* <div>Login to your personal account</div> */}
          <div className="container-fluid">
            <div className="form-group">
              <InputElements
                placeholder="Email adress"
                label="Email"
                name="email"
                type="email"
              />
            </div>
            <div className="form-group">
              <InputElements
                placeholder="******"
                label="Password"
                name="password"
                type={showHidePassword ? 'text' : 'password'}
              />
              <div className="ErorrMessagePassword">{isErrorMessage}</div>
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" checked={showHidePassword} onClick={handleShow} />}
                label="show password"
                labelPlacement="end"
              />
            </div>
            <NavLink to="/menu">
              <button type="submit" className="btn btn-info btn-lg btn-block" id="buttonInput" disabled={!formik.isValid}>
                Sign in</button></NavLink>
            <div type="button" className="btn btn-link btn-lg btn-block" id="recoveryStartText" onClick={handleClickForgotPassword}>
              Forgot your password?</div>
          </div>
        </Form >
      )}
    </Formik >
  );

  switch (isSubmit) {
    case 'filling':
      return render();
    case 'submitted':
      return renderMainMenu();
    case 'submittedFormRecoveryPassword':
      return renderPasswordRecoveryStart();
    default:
      throw new Error(`'${isSubmit}' - unknown state`);
  }
};

InputForm.propTypes = {
  backToForm: PropTypes.func,
};

export default InputForm;
