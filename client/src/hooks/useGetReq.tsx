import { useEffect, useState } from "react";
import customAxios from "../api/apis";

export default function useGetReq(url: string) {
  const [data, setData] = useState([]);
  useEffect(() => {
    customAxios
      .get(url)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);
  return data;
}
