import axios from "axios";

export const registartionRequest = async (values) => {
  try {
    const responce = await axios.post('', {
      values
    })
    console.log(responce.data);
  } catch (e) {
    console.log(e);
  }
}
