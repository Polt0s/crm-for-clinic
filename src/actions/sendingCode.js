import axios from 'axios';

const sendingCode = async (values) => {
  const { code } = values;
  try {
    const response = await axios.post('http://localhost:8080/auth/confirm-code', {
      code,
    });
    console.log(response.data.message);
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export default sendingCode;
