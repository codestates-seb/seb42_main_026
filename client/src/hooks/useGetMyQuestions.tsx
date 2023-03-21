import axios from 'axios';
import { useEffect, useState } from 'react';
import getCookie from '../utils/getCookie';

export default function useGetMyQuestions(url: string) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: getCookie('accessToken'),
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}${url}`, { headers })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);
  return data;
}
