import { useEffect, useState } from "react";
import customAxios from "../api/apis";

export default function useGetRank(url: string) {
  const [data, setData] = useState([]);
  useEffect(() => {
    customAxios
      .get(url)
      .then((response) => {
        setData(response.data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);
  return data;
}
