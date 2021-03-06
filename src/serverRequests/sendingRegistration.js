import axios from 'axios';

const sendingRegistrationData = async (values) => {
  const {
    firstName,
    lastName,
    specialty,
    email,
    password,
  } = values;
  try {
    const response = await axios.post('http://localhost:8082/auth/register-start', {
      email,
      firstName,
      lastName,
      password,
      specialty,
    });
    return { status: response.data.registrationStatus, message: response.data.message };
  } catch (e) {
    console.log(e.response.data.message);
    return null;
  }
};

export default sendingRegistrationData;
