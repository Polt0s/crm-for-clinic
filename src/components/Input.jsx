import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import '../style/registration.css';
import InputElements from './InputElements.jsx';

const InputForm = (props) => {
  const { backToForm } = props;
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={yup.object({
        email: yup.string().email("Не верный формат электронной почты").required("Вы не ввели электронную почту"),
        password: yup.string().min(6).max(16).required("Вы не ввели пароль"),
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
