import axios from 'axios';
import { useEffect, useState } from 'react';
import getCookie from '../utils/getCookie';

export default function useGetMembers(url: string) {
  const [data, setData] = useState({});

  const headers = {
    Authorization: getCookie('accessToken'),
  };
  useEffect(() => {
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
