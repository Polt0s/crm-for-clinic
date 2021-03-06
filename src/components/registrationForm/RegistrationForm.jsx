import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import './registration.css';
import InputElements from './InputElements.jsx';
import sendingRegistrationData from '../../serverRequests/sendingRegistration.js';
import EmailСonfirmation from './ConfirmationOfRegistration.jsx';
import UserAlreadyExists from './UserAlreadyExists.jsx';

let ERROR_MESSAGE;
let EMAIL;
let PASSWORD;

const RegistationForm = (props) => {
  const [isOpen, changeOpenConfirmation] = useState('filling');
  const { backToForm } = props;

  const handleSubmit = () => {
    changeOpenConfirmation('submitted');
  };

  const handleBackToForm = (e) => {
    e.preventDefault();
    changeOpenConfirmation('filling');
  };

  const handleFailed = () => {
    changeOpenConfirmation('failed');
  };

  const renderConfirmation = () => (
    <EmailСonfirmation email={EMAIL} password={PASSWORD} />
  );

  const renderUserAlreadyExists = () => (
    <UserAlreadyExists backToForm={handleBackToForm} text={ERROR_MESSAGE} />
  );

  const renderRegistarionForm = () => (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        specialty: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object({
        firstName: yup.string()
          .max(20, 'Must be no more than 20 characters')
          .required('You did not enter your firstName'),
        lastName: yup.string()
          .max(20, 'Must be no more than 20 characters')
          .required('You did not enter your lastName'),
        email: yup.string().email('Invalid email format').required('You have not entered your email'),
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
        EMAIL = values.email;
        PASSWORD = values.password;
        sendingRegistrationData(values)
          .then((response) => {
            if (response.status === 'FAIL') {
              ERROR_MESSAGE = response.message;
              handleFailed();
            } else {
              handleSubmit();
            }
          }).catch((err) => {
            console.log(`Error ${err}`);
          });
      }}
      validateOnMount
    >
      {(formik) => (
        <Form id="formCheckIn">
          <div className="container-fluid">
            <div className="form-group">
              <InputElements
                placeholder="Your name"
                label="FirstName"
                name="firstName"
                type="text"
              />
            </div>
            <div className="form-group">
              <InputElements
                placeholder="Your last name"
                label="LastName"
                name="lastName"
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="specialty">Specialty</label>
              <Field name="specialty" as="select" className="form-control">
                <option value=""></option>
                <option value="DOCTOR">DOCTOR</option>
                <option value="NURSE">NURSE</option>
              </Field>
            </div>
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
            {/* <button type="button" className="btn btn-primary" id="buttonBack" onClick={backToForm}>Back</button> */}
            <button type="submit" className="btn btn-info btn-lg btn-block" disabled={!formik.isValid}>Sign up</button>
          </div>
        </Form>
      )}
    </Formik>
  );

  switch (isOpen) {
    case 'filling':
      return renderRegistarionForm();
    case 'submitted':
      return renderConfirmation();
    case 'failed':
      return renderUserAlreadyExists();
    default:
      throw new Error(`'${isOpen}' - unknown state`);
  }
};

RegistationForm.propTypes = {
  backToForm: PropTypes.func,
};

export default RegistationForm;
