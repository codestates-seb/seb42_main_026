import axios from 'axios';

interface CustomError extends Error {
  response?: {
    data: any;
    status: number;
  };
}

const signup = async (email: string, password: string, nickname: string, setErrorMessage: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
      email,
      password,
      nickname,
    });
    const { data } = response;
    return data; // 서버에서 발급한 토큰 등의 정보가 담긴 객체
  } catch (error: unknown) {
    const customErr = error as CustomError;
    console.log(customErr.response?.data.fieldErrors[0].field);
    console.log(customErr.response?.data.fieldErrors[0].message);
    return setErrorMessage({
      field: customErr.response?.data.fieldErrors[0].field,
      message: customErr.response?.data.fieldErrors[0].message,
    });
  }
};

export default signup;
