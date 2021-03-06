import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import InputElements from './InputElements.jsx';
import './registration.css';
import Test from '../text.jsx';
import sendingCode from '../../serverRequests/sendingCode.js';
import sendingLoginData from '../../serverRequests/sendingLogin.js';

const EmailСonfirmation = (props) => {
  const { email, password } = props;
  const dispatch = useDispatch();
  const [isConfirm, changeIsConfirm] = useState('filling');
  const [isError, changeError] = useState('');

  const handleSubmit = () => (
    changeIsConfirm('submitted')
  );

  const renderMainMenu = () => (
    <Test />
  );

  const renderFormConfirmation = () => (
    <Formik
      initialValues={{
        confirmationCode: '',
      }}
      validationSchema={yup.object().shape({
        confirmationCode: yup.string().min(6).max(6).required('You did not enter the verification code'),
      })}
      onSubmit={(values) => {
        console.log(document.cookie);
        sendingCode(values)
          .then((response) => {
            // console.log(response)
            if (response.status === 'SUCCESS') {
              dispatch(sendingLoginData(email, password));
              handleSubmit();
            }
            changeError(response.message);
          }).catch((err) => {
            console.log(`Error ${err}`);
          });
      }}
      validateOnMount
    >
      {(formik) => (
        <Form id="formСonfirmation">
          <div className="container-fluid">
            <div id="textConfirmation">
              <p>We sent you an email with a confirmation confirmation code</p>
            </div>
            <div className="form-group">
              <InputElements
                placeholder="Enter confirmation code"
                label="Сonfirmation сode"
                name="confirmationCode"
                type="text"
              />
              <div className="Text_error">{isError}</div>
            </div>
            <button type="submit" className="btn btn-info" id="confirm" disabled={!formik.isValid}>Send</button>
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
