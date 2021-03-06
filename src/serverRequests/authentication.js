import axios from 'axios';
import { addUser } from '../actions/index.js';
import parseJWT from './parseTokenJWT.js';

const auth = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8082/auth/me',
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    const parseToken = parseJWT(response.data.token);
    localStorage.setItem('token', response.data.token);
    dispatch(addUser(parseToken.userEmail));
  } catch (e) {
    console.log(e.responce.data.message);
    localStorage.removeItem('token');
  }
};

export default auth;
