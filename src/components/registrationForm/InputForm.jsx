import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import * as yup from 'yup';
import './registration.css';
import InputElements from './InputElements.jsx';
import Test from '../text.jsx';
import sendingLoginData from '../../actions/sendingLogin.js';

const InputForm = (props) => {
  const dispatch = useDispatch();
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const [isSubmit, changeSubmit] = useState('filling');

  const handleShow = (e) => {
    e.preventDefault();
    changeShowHidePassword(!showHidePassword);
  };

  const renderMainMenu = () => (
    <Test />
  );

  const handleSubmit = () => {
    changeSubmit('submitted');
  };

  const { backToForm } = props;
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
        dispatch(sendingLoginData(email, password));
        handleSubmit();
      }}
      validateOnMount
    >
      {(formik) => (
        <Form id="formInput">
          <div className="container-fluid">

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
                type={showHidePassword ? 'text' : 'password'}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" checked={showHidePassword} onClick={handleShow} />}
                label="Check password"
                labelPlacement="end"
              />
            </div>
            <button type="button" className="btn btn-primary" id="buttonBack" onClick={backToForm}>Back</button>
            <button type="submit" className="btn btn-primary" id="buttonInput" disabled={!formik.isValid}>Sign in</button>
          </div>
        </Form>
      )}
    </Formik >
  );

  switch (isSubmit) {
    case 'filling':
      return render();
    case 'submitted':
      return renderMainMenu();
    default:
      throw new Error(`'${isSubmit}' - unknown state`);
  }
};

InputForm.propTypes = {
  backToForm: PropTypes.func,
};

export default InputForm;
