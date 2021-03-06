import axios from 'axios';

const sendingEmailForRecovery = async (values) => {
  const { email } = values;
  try {
    const response = await axios.post('http://localhost:8082/auth/restore-start', {
      email,
    });
    console.log(response.data)
    return { status: response.data.registrationStatus, message: response.data.message };
  } catch (err) {
    console.log(err.response.data.message);
    return null;
  }
};

export default sendingEmailForRecovery;
