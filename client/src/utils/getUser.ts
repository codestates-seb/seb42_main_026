import getCookie from './cookieUtils';
import decodeJwt from './jwtUtils';

export function getUser() {
  const accessToken = getCookie('accessToken');
  if (!accessToken) {
    window.location.replace('/login');
    return null;
  }

  const decoded = decodeJwt(accessToken);
  if (!decoded) {
    window.location.replace('/login');
    return null;
  }

  const memberId = () => decoded.memberId;
  const nickname = () => decoded.name;
  return { memberId, nickname };
}
