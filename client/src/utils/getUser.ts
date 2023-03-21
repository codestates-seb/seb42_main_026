import getCookie from './getCookie';
import decodeJwt from './jwtUtils';

export function getUser() {
  const accessToken = getCookie('accessToken');
  const decoded = decodeJwt(accessToken);

  const memberId = () => {
    return decoded.memberId;
  };

  const nickname = () => {
    return decoded.name;
  };
  return { memberId, nickname };
}
