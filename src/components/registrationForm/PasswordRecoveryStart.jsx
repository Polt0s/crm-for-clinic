import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import './registration.css';
import InputElements from './InputElements.jsx';
import sendingEmailForRecovery from '../../serverRequests/sendingEmailForRecovery.js';
import PasswordRecoveryFinish from './PasswordRecoveryFinish.jsx';

const PasswordRecoveryStart = () => {
  const [isSubmit, changeSubmit] = useState('filling');
  const [isErrorMessage, changeErrorMessage] = useState('');

  const handleSubmit = () => {
    changeSubmit('submitted');
  };

  const renderPasswordRecoveryFinish = () => (
    <PasswordRecoveryFinish />
  );

  const renderPasswordRecoveryStart = () => (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email('Invalid email format').required('You have not entered your email'),
      })}
      onSubmit={(values) => {
        sendingEmailForRecovery(values)
          .then((response) => {
            if (response.status === 'SUCCESS') {
              handleSubmit();
            } else {
              changeErrorMessage(response.message);
            }
          });
      }}
      validateOnMount
    >
      {(formik) => (
        <Form id="formRecovery">
          <div className="container-fluid">
            <div className="form-group">
              <InputElements
                placeholder="Email adress"
                label="Email"
                name="email"
                type="email"
              />
            </div>
            <div className="errorMessagePasswordRecovery">{isErrorMessage}</div>
            <button type="submit" className="btn btn-info btn-lg btn-block" disabled={!formik.isValid}>Send</button>
          </div>
        </Form>
      )}
    </Formik >
  );

  switch (isSubmit) {
    case 'filling':
      return renderPasswordRecoveryStart();
    case 'submitted':
      return renderPasswordRecoveryFinish();
    default:
      throw new Error(`'${isSubmit}' - unknown state`);
  }
};

export default PasswordRecoveryStart;
