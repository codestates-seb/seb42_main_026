import axios from "axios";
import getCookie from "../utils/cookieUtils";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: getCookie("accessToken"),
  },
  //   timeout: 1000,
});

export default customAxios;

// 요청에 쿠키, 인증헤더,인증서와 같은 자격증명을 포함해야하는지 여부를 나타내는 데 사용
// customAxios.defaults.withCredentials = true;

// GET 요청 예시
// customAxios
//   .get("/users")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// POST 요청 예시
// customAxios
//   .post("/users", {
//     "memberId" : 1,
//     "title": "How it works?",
//     "content": "I don't konw.",
//     "tagName" : "운동",
//   })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
