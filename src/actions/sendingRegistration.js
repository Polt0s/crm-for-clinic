import axios from 'axios';

const sendingRegistrationData = async (values) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/register-start', {
      values,
    });
    console.log(response.data.message);
  } catch (e) {
    console.log(e.response.data.message);
  }
};

export default sendingRegistrationData;
