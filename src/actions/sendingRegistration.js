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
    const response = await axios.post('http://localhost:8082/auth/register-start', {
      firstName,
      lastName,
      specialty,
      email,
      password,
      confirmPassword,
    });
    return response.data.registrationStatus;
  } catch (e) {
    console.log(e.response.data.message);
    return null;
  }
};

export default sendingRegistrationData;
