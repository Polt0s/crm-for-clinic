import axios from 'axios';
import { addUser } from './index.js';
import parseJwt from './parseTokenJWT.js';

const sendingLoginData = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8082/auth/login', {
      email,
      password,
    });
    // console.log(response)
    const parseJWT = parseJwt(response.data.token);
    localStorage.setItem('token', response.data.token);
    dispatch(addUser(parseJWT.userEmail));
  } catch (e) {
    console.log(e.response.data.message);
  }
};

export default sendingLoginData;
