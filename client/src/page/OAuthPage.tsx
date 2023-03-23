import { useEffect } from 'react';

const OAuthPage = () => {
  useEffect(() => {
    let accessToken = new URL(window.location.href).searchParams.get(
      'access_token'
    );
    let refreshToken = new URL(window.location.href).searchParams.get(
      'refresh_token'
    );
    document.cookie = `accessToken=${accessToken};`;
    document.cookie = `refreshToken=${refreshToken};`;

    window.location.replace('/');
  }, []);

  return <></>;
};

export default OAuthPage;
