import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { UserContext } from '../Context/UserContext';
import { ShopContext } from '../Context/Shopcontext';
import '../assets/css/Navbar.css';
import brand from '../assets/images/brand2.png';

function Navbar() {
  const { logout } = useContext(UserContext);
  const { cartitems } = useContext(ShopContext);
  const [openModal, setOpenModal] = useState(false);

  const handleLogout = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  // Calculate total items in cart
  const totalItemsInCart = Object.values(cartitems).reduce((total, count) => total + count, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand ms-5">
          <img src={brand} width='120px' alt="Brand Logo" />
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-white d-flex align-items-center">
                <FaCartShopping className="me-2" />
                Cart {totalItemsInCart > 0 && <span className="badge bg-warning text-dark ms-2">{totalItemsInCart}</span>}
              </Link>
            </li>
            <li className="nav-item ms-3">
              <button 
                onClick={handleLogout} 
                className="btn btn-outline-light d-flex align-items-center"
              >
                <IoIosLogOut className="me-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="logoutModalLabel">Confirm Logout</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button onClick={logout} className="btn btn-danger">Logout</button>
                <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
