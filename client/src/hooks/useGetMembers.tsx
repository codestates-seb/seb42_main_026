import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useGetMembers(url: string) {
  const [data, setData] = useState({});

  function getCookie(key: string | RegExp | undefined) {
    key = new RegExp(key + '=([^;]*)'); // 쿠키들을 세미콘론으로 구분하는 정규표현식 정의
    return key.test(document.cookie) ? unescape(RegExp.$1) : ''; // 인자로 받은 키에 해당하는 키가 있으면 값을 반환
  }

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
