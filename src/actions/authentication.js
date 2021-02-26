import axios from 'axios';
import { addUser } from './index.js';
import parseJwt from './parseTokenJWT.js';

const auth = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8082/auth/login',
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    const parseJWT = parseJwt(response.data.token);
    localStorage.setItem('token', response.data.token);
    dispatch(addUser(parseJWT.userEmail));
  } catch (e) {
    console.log(e.responce.data.message);
    localStorage.removeItem('token');
  }
};

export default auth;
