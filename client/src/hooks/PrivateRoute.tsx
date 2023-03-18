import { useEffect, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoute = ({ children }: PropsWithChildren<any>) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default PrivateRoute;
