import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ShopContextProvider } from "./Context/Shopcontext";
import { UserProvider, UserContext } from "./Context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/NotFound";
import ProductManagement from "./admin/ProductManagement";
import Cart from "./cart/Cart";
import Checkout from "./cart/Checkout";
import Shop from './shop/Shop'
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <UserProvider>
      <ShopContextProvider>
        <Router>
          <AppContent />
          <ToastContainer />
        </Router>
      </ShopContextProvider>
    </UserProvider>
  );
}

function AppContent() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    // Prevent unauthorized access for users navigating to admin routes
    if (user && user.role === "user" && window.location.pathname.startsWith("/admin")) {
      window.alert("You are not authorized to access this page.");
      window.location.href = "/shop";
    }
  }, [user]);

  return (
    <>
      {user && user.role === "user" && <Navbar />}
      <Routes>
         <Route path="/" element={user ? <Navigate to={user.role === "admin" ? "/admin/product-management" : "/shop"} /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to={user.role === "admin" ? "/admin/product-management" : "/shop"} /> : <Login />} />
        <Route path="/shop" element={<Shop /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/checkout" element={<Checkout /> } />
        <Route path="/admin/product-management" element={user && user.role === "admin" ? <ProductManagement /> : user && user.role === "user" ? <Navigate to="/shop" replace /> : <Navigate to="/login" />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;

















 {/* <Route path="/shop" element={user && user.role === "user" ? <Shop /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user && user.role === "user" ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={user && user.role === "user" ? <Checkout /> : <Navigate to="/login" />} />
        <Route path="/admin/product-management" element={user && user.role === "admin" ? <ProductManagement /> : user && user.role === "user" ? <Navigate to="/shop" replace /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} /> */}
        {/* <Route path="/" element={ <Login />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}