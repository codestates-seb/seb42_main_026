import axios from 'axios';

const signup = async (email: string, password: string, nickname: string) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/members`, {
      email,
      password,
      nickname,
    });
    const { data } = response;
    return data; // 서버에서 발급한 토큰 등의 정보가 담긴 객체
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default signup;
