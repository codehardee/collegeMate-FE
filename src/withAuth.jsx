import React from 'react';
import { getAccessToken } from './authHelpers';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const token = getAccessToken();

    let isUserLoggedIn;

    if (token) {
      isUserLoggedIn = true;
    } else {
      isUserLoggedIn = false;
    }

    return <WrappedComponent {...props} isAuthenticated={isUserLoggedIn} />;
  };
};

export default withAuth;  
