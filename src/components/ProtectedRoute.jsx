import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = React.useContext(UserContext);

  

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate path based on role if unauthorized
    return user.role === 'user' ? <Navigate to="/shop" /> : <Navigate to="/admin/product-management" />;
  }

  return children;
};

export default ProtectedRoute;
