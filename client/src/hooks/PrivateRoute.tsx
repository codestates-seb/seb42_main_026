import { useEffect, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoute = ({ children }: PropsWithChildren<any>) => {
  const { isLoggedIn, checkTokenExpiration } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !checkTokenExpiration()) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate, checkTokenExpiration]);

  return children;
};

export default PrivateRoute;
