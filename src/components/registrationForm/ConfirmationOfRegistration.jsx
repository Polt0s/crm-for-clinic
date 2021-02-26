import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputElements from './InputElements.jsx';
import './registration.css';
import Test from '../text.jsx';
import sendingCode from '../../actions/sendingCode.js';

const EmailСonfirmation = () => {
  const [isConfirm, changeIsConfirm] = useState('filling');
  const [showHidePassword, changeShowHidePassword] = useState(false);

  const handleShow = (e) => {
    e.preventDefault();
    changeShowHidePassword(!showHidePassword);
  };

  const handleSubmit = () => (
    changeIsConfirm('submitted')
  );
  const renderMainMenu = () => (
    <Test />
  );

  const renderFormConfirmation = () => (
    <Formik
      initialValues={{
        code: '',
      }}
      validationSchema={yup.object().shape({
        code: yup.string().min(6).max(6).required('the code must be digits'),
      })}
      onSubmit={(values) => {
        sendingCode(values);
        handleSubmit();
        console.log(values);
      }}
      validateOnMount
    >
      {(formik) => (
        <Form id="formСonfirmation">
          <div className="container-fluid">
            <div id="textConfirmation">
              <p>We sent you an email with a confirmation code</p>
            </div>
            <div className="form-group">
              <InputElements
                label="Сonfirmation сode"
                name="code"
                type={showHidePassword ? 'text' : 'password'}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" checked={showHidePassword} onClick={handleShow} />}
                label="Check password"
                labelPlacement="end"
              />
            </div>
            <button type="submit" className="btn btn-primary" id="confirm" disabled={!formik.isValid}>Confirm</button>
          </div>
        </Form>
      )}
    </Formik>
  );
  switch (isConfirm) {
    case 'filling':
      return renderFormConfirmation();
    case 'submitted':
      return renderMainMenu();
    default:
      throw new Error(`'${isConfirm}' - unknown state`);
  }
};

export default EmailСonfirmation;
