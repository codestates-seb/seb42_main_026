import getCookie from './cookieUtils';
import decodeJwt from './jwtUtils';

export function getUser() {
  const accessToken = getCookie('accessToken');
  const decoded = decodeJwt(accessToken);

  const memberId = () => {
    return decoded.memberId;
  };

  const nickname = () => {
    return decoded.nickname;
  };
  return { memberId, nickname };
}
