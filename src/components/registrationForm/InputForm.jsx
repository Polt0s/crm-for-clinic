import React, { useState } from 'react';
import { Formik, Form, } from 'formik';
import * as yup from 'yup';
import './registration.css';
import { InputElements } from './InputElements.jsx';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

const InputForm = (props) => {
  const { backToForm } = props;
  // const [showHidePassword, changeShowHidePassword] = useState(false);
  // const [rightIcon, useRightIcon] = useState(VisibilityOffIcon);

  // const handleShow = (e) => {
  //   e.preventDefault();
  //   changeShowHidePassword(!showHidePassword)
  //   // useRightIcon(rightIcon === VisibilityOffIcon ? VisibilityIcon : VisibilityOffIcon)
  // }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        showPassword: false,
      }}
      validationSchema={yup.object({
        email: yup.string().email("Не верный формат электронной почты").required("Вы не ввели электронную почту"),
        password: yup.string().min(6).max(16).required("Вы не ввели пароль"),
        showPassword: yup.boolean().oneOf([true], ''),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form id="formInput">
        <div className="container-fluid">

          <div className="form-group">
            <InputElements
              label="Электронная почта"
              name="email"
              type="text"
            />
          </div>
          <div className="form-group">
            <InputElements
              label="Пароль"
              name="password"

              // type={showHidePassword ? 'text' : 'password'}
              type="text"
            />

          </div>
          <button type="button" className="btn btn-primary" id="buttonBack" onClick={backToForm}>Вернуться</button>
          <button type="submit" className="btn btn-primary" id="buttonInput">Войти</button>
        </div>
      </Form>
    </Formik>
  );
}

export default InputForm;
