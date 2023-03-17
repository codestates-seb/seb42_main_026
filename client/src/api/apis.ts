import axios from "axios";

function getCookie(key: string | RegExp | undefined) {
  key = new RegExp(key + "=([^;]*)"); // 쿠키들을 세미콘론으로 구분하는 정규표현식 정의
  return key.test(document.cookie) ? unescape(RegExp.$1) : ""; // 인자로 받은 키에 해당하는 키가 있으면 값을 반환
}

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
