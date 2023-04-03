import { useEffect } from 'react';
import decodeJwt from '../utils/jwtUtils';

const OAuthPage = () => {
  useEffect(() => {
    let accessToken = new URL(window.location.href).searchParams.get('access_token');
    let refreshToken = new URL(window.location.href).searchParams.get('refresh_token');

    if (accessToken !== null && refreshToken !== null) {
      const decodedAccessToken = decodeJwt(accessToken);
      const accessTokenExp = new Date(decodedAccessToken.exp * 1000);
      const decodedRefreshToken = decodeJwt(refreshToken);
      const refreshTokenExp = new Date(decodedRefreshToken.exp * 1000);
      document.cookie = `accessToken=${accessToken}; path=/; expires=${accessTokenExp.toUTCString()};`;
      document.cookie = `refreshToken=${refreshToken}; path=/; expires=${refreshTokenExp.toUTCString()};`;
    }
    window.location.replace('/');
  }, []);

  return <></>;
};

export default OAuthPage;
