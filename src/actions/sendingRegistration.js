import axios from 'axios';

const sendingRegistrationData = async (values) => {
  const {
    firstName,
    lastName,
    specialty,
    email,
    password,
    confirmPassword,
  } = values;
  try {
    const response = await axios.post('http://localhost:8080/auth/register-start', {
      firstName,
      lastName,
      specialty,
      email,
      password,
      confirmPassword,
    });
    console.log(response.data.message);
  } catch (e) {
    console.log(e.response.data.message);
  }
};

export default sendingRegistrationData;
