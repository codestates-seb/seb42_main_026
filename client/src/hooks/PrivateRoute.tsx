import { useEffect, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoute = ({ children }: PropsWithChildren<any>) => {
  const { isLoggedIn, checkTokenExpiration } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const result = await checkTokenExpiration();
      if (!isLoggedIn && !result) {
        navigate('/login', { replace: true });
      }
    };
    checkLoginStatus();
  }, [isLoggedIn, navigate, checkTokenExpiration]);

  return children;
};

export default PrivateRoute;
