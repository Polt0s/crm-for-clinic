import axios from 'axios';
import { addUser } from './index.js';

const sendingCode = (values) => async (dispatch) => {
  const { code } = values;
  try {
    const response = await axios.post('http://localhost:8082/auth/confirm-code', {
      code,
    });
    console.log(response);
    localStorage.setItem('token', response.data.token);
    dispatch(addUser(response.data.token));
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export default sendingCode;
