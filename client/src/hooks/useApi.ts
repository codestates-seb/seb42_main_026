import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/actions';
import getCookie from '../utils/cookieUtils';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

type HttpMethod = 'get' | 'post' | 'patch' | 'delete';

interface Options {
  headers?: Record<string, string>;
}

interface ApiResult<T> {
  data: T | null;
  error: string | null;
  makeApiRequest: () => Promise<void>;
}

export const useApi = <T>(method: HttpMethod, url: string, options?: Options, data?: Record<string, any>): ApiResult<T> => {
  const [apiData, setApiData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const makeApiRequest = async () => {
    try {
      let response;
      if (method === 'get') {
        const headers = {
          Authorization: `${getCookie('accessToken')}`,
        };
        response = await axios.get<T>(`${BASE_URL}/${url}`, { headers });
      } else {
        let formData: FormData | undefined = undefined;
        if (data instanceof FormData) {
          formData = data;
        } else if (data) {
          formData = new FormData();
          Object.keys(data).forEach((key) => {
            formData?.append(key, data[key]);
          });
        }
        response = await axios[method]<T>(`${BASE_URL}/${url}`, formData, options);
      }
      setApiData(response.data);
      setError(null);
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        setApiData(null);
        setError(err.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const lazyMakeApiRequest = async () => {
    // 1초 후에 API 호출
    dispatch(setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await makeApiRequest();
  };

  return { data: apiData, error, makeApiRequest: lazyMakeApiRequest };
};
