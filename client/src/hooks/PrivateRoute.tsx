import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
