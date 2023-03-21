import axios from 'axios';

interface CustomError extends Error {
  response?: {
    data: any;
    status: number;
  };
}

const signup = async (email: string, password: string, nickname: string, setErrorMessage: React.Dispatch<React.SetStateAction<any>>) => {
  const data = { email, password, nickname };
  const formData = new FormData();
  formData.append('memberPostDto', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, formData);
    alert('회원가입이 완료되었습니다.');
    return 
  } catch (error: unknown) {
    const customErr = error as CustomError;
    return setErrorMessage({
      field: customErr.response?.data.fieldErrors[0].field,
      message: customErr.response?.data.fieldErrors[0].message,
    });
  }
};

export default signup;
