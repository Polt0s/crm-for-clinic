import axios from 'axios';
import Cookies from 'js-cookie';

const sendingCode = async (values) => {
  const { confirmationCode } = values;
  // Cookies.remove('foo');
  // console.log(document.cookie)
  try {
    const response = await axios.post('http://localhost:8082/auth/register-finish', {
      confirmationCode,
    });
    return { status: response.data.registrationStatus, message: response.data.message };
  } catch (err) {
    console.log(err.response.data.message);
    return null;
  }
};

export default sendingCode;
