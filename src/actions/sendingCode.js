import axios from 'axios';

const sendingCode = async (values) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/confirm-code', {
      values,
    });
    console.log(response.data.message);
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export default sendingCode;
