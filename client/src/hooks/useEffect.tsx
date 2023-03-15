import { useEffect } from "react";
import customAxios from "../api/apis";

export default function useGetReq(url: string) {
  useEffect(() => {
    customAxios
      .get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(process.env.REACT_APP_BASE_URL);
        alert(err);
      });
  }, []);
}
