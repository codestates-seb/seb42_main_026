import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { login, logout } from "../store/actions";
import decodeJwt from "../utils/jwtUtils";
import getCookie from "../utils/cookieUtils";

export function useAuth() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();

  const loginHandler = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        username,
        password,
      });
      const { data } = response;
      //domain=${process.env.REACT_APP_COOKIE_DOMAIN}; secure; httpOnly
      document.cookie = `accessToken=${response.headers["authorization"]}; path=/;`;
      document.cookie = `refreshToken=${response.headers["refresh"]}; path=/;`;
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");
      const accessTokenCookie = cookies.find((cookie) => cookie.startsWith("accessToken="));
      if (accessTokenCookie) {
        const accessToken = accessTokenCookie.split("=")[1];
        const decoded = decodeJwt(accessToken);
        localStorage.setItem("memberId", decoded.memberId);
        localStorage.setItem("nickname", decoded.sub);
        dispatch(login());
        navigate("/");
        alert("로그인 성공!");
      }
      return data;
    } catch (error) {
      console.error(error);
      alert("로그인 실패!");
      return null;
    }
  };

  const checkTokenExpiration = () => {
    const accessToken = getCookie("accessToken");
    if (accessToken !== "") {
      const decoded = decodeJwt(accessToken);
      const now = Date.now();

      if (now >= decoded.exp * 1000) {
        // 만료되었음
        console.log("토큰이 만료되었습니다.");
        return false;
      } else {
        // 유효함
        console.log("토큰이 유효합니다.");
        dispatch(login());
        return true;
      }
    }
  };

  function deleteCookie(name: string) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  const logoutHandler = () => {
    // document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${process.env.REACT_APP_COOKIE_DOMAIN}; secure; httpOnly;`;
    // document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${process.env.REACT_APP_COOKIE_DOMAIN}; secure; httpOnly;`;
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    localStorage.removeItem("memberId");
    localStorage.removeItem("nickname");
    localStorage.removeItem("undefined");
    dispatch(logout());
    navigate("/");
  };

  return { isLoggedIn, loginHandler, logoutHandler, checkTokenExpiration };
}
