import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import * as yup from 'yup';
import './registration.css';
import InputElements from './InputElements.jsx';

const InputForm = (props) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);

  const handleShow = (e) => {
    e.preventDefault();
    changeShowHidePassword(!showHidePassword);
  };

  const { backToForm } = props;
  return (
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
        console.log(values);
      }}
    >
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
              id="proba"
              type={showHidePassword ? 'text' : 'password'}
            />
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" checked={showHidePassword} onClick={handleShow} />}
              label="Check password"
              labelPlacement="end"
            />
          </div>
          <button type="button" className="btn btn-primary" id="buttonBack" onClick={backToForm}>Вернуться</button>
          <button type="submit" className="btn btn-primary" id="buttonInput">Войти</button>
        </div>
      </Form>
    </Formik >
  );
};

InputForm.propTypes = {
  backToForm: PropTypes.func,
};

export default InputForm;
