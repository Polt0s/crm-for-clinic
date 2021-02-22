import axios from 'axios';
import { addUser } from './index.js';

const sendingLoginData = (values) => async (dispatch) => {
  try {
    const responce = await axios.post('http://localhost:8080/auth/login', {
      values,
    });
    dispatch(addUser(responce.data.user));
    localStorage.setItem('token', responce.date.token);
  } catch (e) {
    console.log(e.responce.data.message);
  }
};

export default sendingLoginData;
