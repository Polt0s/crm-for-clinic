import axios from 'axios';

const sendingNewPasswordData = async (values) => {
  const { confirmationCode, password } = values;
  try {
    const response = await axios.post('http://localhost:8082/auth/restore-finish', {
      confirmationCode,
      password,
    });
    console.log(response.data.registrationStatus)
    return { status: response.data.registrationStatus, message: response.data.message };
  } catch (e) {
    console.log(e.response.data.message);
    return null;
  }
};

export default sendingNewPasswordData;
