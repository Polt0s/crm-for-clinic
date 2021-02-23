import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import './registration.css';
import InputElements from './InputElements.jsx';
import sendingRegistrationData from '../../actions/sendingRegistration.js';
import EmailСonfirmation from './ConfirmationOfRegistration.jsx';

const RegistationForm = (props) => {
  const [isOpen, changeOpenConfirmation] = useState('filling');
  const { backToForm } = props;

  const handleSubmit = () => {
    changeOpenConfirmation('submitted');
  };

  const renderMenu = () => (
    <EmailСonfirmation />
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
        // specialty: yup.string()
        //   .oneOf(['DOCTOR', 'NURSE']).required('You have not chosen a position'),
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
        sendingRegistrationData(values);
        handleSubmit();
        console.log(values);
      }}
      validateOnMount
    >
      {(formik) => (
        <Form id="formCheckIn">
          <div className="container-fluid">

            <div className="form-group">
              <InputElements
                label="LastName"
                name="lastName"
                type="text"
              />
            </div>
            <div className="form-group">
              <InputElements
                label="FirstName"
                name="firstName"
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="specialty">Speciality</label>
              <Field name="specialty" as="select" className="form-control">
                <option value=""></option>
                <option value="DOCTOR">DOCTOR</option>
                <option value="NURSE">NURSE</option>
              </Field>
            </div>
            <div className="form-group">
              <InputElements
                label="Email"
                name="email"
                type="email"
              />
            </div>
            <div className="form-group">
              <InputElements
                label="Password"
                name="password"
                type="password"
              />
            </div>
            <div className="form-group">
              <InputElements
                label="Confirm password"
                name="confirmPassword"
                type="password"
              />
            </div>
            <button type="button" className="btn btn-primary" id="buttonBack" onClick={backToForm}>Back</button>
            <button type="submit" className="btn btn-primary" id="buttonCheckIn" disabled={!formik.isValid}>Sign up</button>

          </div>
        </Form>
      )}
    </Formik>
  );

  switch (isOpen) {
    case 'filling':
      return renderRegistarionForm();
    case 'submitted':
      return renderMenu();
    default:
      throw new Error(`'${isOpen}' - unknown state`);
  }
};

RegistationForm.propTypes = {
  backToForm: PropTypes.func,
};

export default RegistationForm;
