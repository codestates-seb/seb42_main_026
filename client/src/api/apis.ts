import axios from 'axios';
import getCookie from '../utils/getCookie';

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: getCookie('accessToken'),
  },
});

export default customAxios;
