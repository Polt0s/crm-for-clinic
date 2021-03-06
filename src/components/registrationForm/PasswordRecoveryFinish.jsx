import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import './registration.css';
import InputElements from './InputElements.jsx';
import sendingNewPasswordData from '../../serverRequests/sendingNewPasswordData.js';

const PasswordСhanged = () => (
  <div className="container-fluid" id="infoPasswordChanged">
    <div>
      <p>Password changed successfully</p>
    </div>
  </div>
);

const PasswordRecoveryFinish = () => {
  const [isSubmit, changeSubmit] = useState('filling');
  const [isErrorCodeMessage, changeErrorCodeMessage] = useState('');

  const handleChange = () => {
    changeSubmit('submitted');
  };

  const renderPasswordСhanged = () => (
    <PasswordСhanged />
  );

  const renderPasswordRecoveryFinish = () => (
    <Formik
      initialValues={{
        confirmationCode: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object().shape({
        confirmationCode: yup.string().min(6).max(6).required('You did not enter the verification code'),
        password: yup.string()
          .min(8, 'Password must be at least 8 characters')
          .max(127, 'password must not exceed 127 characters')
          .required('You did not enter your password'),
        confirmPassword: yup.string().when('password', {
          is: (check) => (check && check.length > 0),
          then: yup.string().oneOf(
            [yup.ref('password')],
            'Password mismatch',
          ),
        }),
      })}
      onSubmit={(values) => {
        sendingNewPasswordData(values)
          .then((response) => {
            if (response.status === 'SUCCESS') {
              handleChange();
            } else {
              changeErrorCodeMessage(response.message);
            }
          });
      }}
    >
      {(formik) => (
        <Form id="formRasswordRecoveryFinish">
          <div className="container-fluid">
            <div className="form-group">
              <InputElements
                placeholder="Enter confirmation code"
                label="Сonfirmation сode"
                name="confirmationCode"
                type="text"
              />
              <div className="errorRecoveryFinish">{isErrorCodeMessage}</div>
            </div>
            <div className="form-group">
              <InputElements
                placeholder="******"
                label="Password"
                name="password"
                type="password"
              />
            </div>
            <div className="form-group">
              <InputElements
                placeholder="******"
                label="Confirm password"
                name="confirmPassword"
                type="password"
              />
            </div>
            <button type="submit" className="btn btn-info btn-lg btn-block" disabled={!formik.isValid}>Sign in</button>
          </div>
        </Form>
      )}
    </Formik>
  );

  switch (isSubmit) {
    case 'filling':
      return renderPasswordRecoveryFinish();
    case 'submitted':
      return renderPasswordСhanged();
    default:
      throw new Error(`'${isSubmit}' - unknown state`);
  }
};

export default PasswordRecoveryFinish;
