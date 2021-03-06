import axios from 'axios';
import { addUser } from '../actions/index.js';
import parseJwt from './parseTokenJWT.js';

const sendingLoginData = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8082/auth/login', {
      email,
      password,
    });
    if (response.data.status === 'SUCCESS') {
      localStorage.setItem('token', response.data.token);
      const parseToken = parseJwt(response.data.token);
      dispatch(addUser(parseToken.userEmail, parseToken.roles[0]));
    }
    return { status: response.data.status, message: response.data.message };
  } catch (e) {
    console.log(e.response.data.message);
    return null;
  }
};

export default sendingLoginData;
