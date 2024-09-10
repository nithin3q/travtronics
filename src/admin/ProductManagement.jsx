import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

function ProductManagement() {
  const { logout } = useContext(UserContext);


  return (
    <div className="container mt-5">
      <h2>Product Management</h2>
      <button onClick={logout}>logout</button>
      
    </div>
  );
}

export default ProductManagement;
