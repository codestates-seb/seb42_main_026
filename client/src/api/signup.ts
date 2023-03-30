import axios from 'axios';

interface CustomError extends Error {
  response?: {
    data: any;
    status: number;
  };
}

const signup = async (email: string, password: string, nickname: string, setErrorMessage: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signUp`, {
      email,
      password,
      nickname,
    });
    const { data } = response;
    alert('회원가입이 완료되었습니다.');
    window.location.replace('/login');
    return data;
  } catch (error: unknown) {
    const customErr = error as CustomError;
    if (customErr.response && customErr.response.status === 409) {
      alert(customErr.response.data.customErrors.message);
    }
    return setErrorMessage({
      field: customErr.response?.data.fieldErrors[0].field,
      message: customErr.response?.data.fieldErrors[0].message,
    });
  }
};

export default signup;
