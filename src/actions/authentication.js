import axios from 'axios';
import { addUser } from './index.js';

const auth = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/auth/auth',
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    dispatch(addUser(response.data.user));
    localStorage.setItem('token', response.date.token);
  } catch (e) {
    console.log(e.responce.data.message);
    localStorage.removeItem('token');
  }
};

export default auth;
