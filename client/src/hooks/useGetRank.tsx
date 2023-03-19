import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetRank(url: string) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}${url}`)
      .then((response) => {
        setData(response.data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return data;
}
