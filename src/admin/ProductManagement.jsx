import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import "../assets/css/ProductManagement.css"; // Ensure you have this CSS file

function ProductManagement() {
  const { logout } = useContext(UserContext);

  return (
    <div className="container mt-5">
      <div className="under-construction">
        <h1 className='border-bottom p-5 text-danger'>Product Mangement</h1>
        <h2>Page Under Construction</h2>
        <p>We are working hard to bring you this feature. Please check back later.</p>
        <button onClick={logout} className="btn btn-primary">Logout</button>
      </div>
    </div>
  );
}

export default ProductManagement;
