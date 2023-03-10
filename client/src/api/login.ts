import axios from 'axios';

const BASE_URL = 'http://52.78.46.142:8080';

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    const { data } = response;
    return data; // 서버에서 발급한 토큰 등의 정보가 담긴 객체
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default login;