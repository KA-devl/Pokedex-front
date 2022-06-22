import React from 'react';
import { Outlet} from 'react-router-dom';
import AuthenticationService from './services/authentication-service';
import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = AuthenticationService.isAuthenticated;
  
  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace={true} />
    );
  }

  return <Outlet />;
  

}
  
export default PrivateRoute;