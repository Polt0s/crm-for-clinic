import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import './registration.css';
import { InputElements, InputSelect } from './InputElements.jsx';

const RegistationForm = (props) => {
  const { backToForm } = props;
  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        typeOfSpecialty: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object({
        email: yup.string().email("Не верный формат электронной почты").required("Вы не ввели электронную почту"),
        name: yup.string()
          .max(10, "Должно быть не более 10 символов.")
          .required("Вы не ввели ваше имя"),
        typeOfSpecialty: yup.string()
          .oneOf(['Врач', 'Медсестра']).required('Вы не выбрали должность'),
        password: yup.string()
          .min(6, "Пароль дожлен быть не меньше 6 символов")
          .max(16, "пароль не должен быть больше 16 символов")
          .required("Вы не ввели пароль"),
        confirmPassword: yup.string().when("password", {
          is: check => (check && check.length > 0 ? true : false),
          then: yup.string().oneOf(
            [yup.ref("password")],
            "пароли не совпадают"
          )
        }),
      })}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form id="formCheckIn">
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
              label="Имя"
              name="name"
              type="text"
            />
          </div>
          <div className="form-group">
            <InputSelect label="Специализация" name="typeOfSpecialty">
              <option value=""></option>
              <option value="Врач">Врач</option>
              <option value="Медсестра">Медсестра</option>
            </InputSelect>
          </div>
          <div className="form-group">
            <InputElements
              label="Пароль"
              name="password"
              type="text"
            />
          </div>
          <div className="form-group">
            <InputElements
              label="Подтверждение пароля"
              name="confirmPassword"
              type="text"
            />
          </div>
          <button type="button" className="btn btn-primary" id="buttonBack" onClick={backToForm}>Вернуться</button>
          <button type="submit" className="btn btn-primary" id="buttonCheckIn">Зарегистрироваться</button>

        </div>
      </Form>
    </Formik>
  );
}

export default RegistationForm;
