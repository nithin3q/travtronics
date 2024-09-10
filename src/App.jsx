import React, { Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ShopContextProvider } from "./Context/Shopcontext";
import { UserProvider, UserContext } from "./Context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/NotFound";

const ProductManagement = lazy(() => import("./admin/ProductManagement"));
const Shop = lazy(() => import("./shop/Shop"));
const Cart = lazy(() => import("./cart/Cart"));
const Checkout = lazy(() => import("./cart/Checkout"));
const Login = lazy(() => import("./components/Login"));
const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  return (
    <UserProvider>
      <ShopContextProvider>
        <Router>
          <Suspense fallback={<div className="spinner ">Loading</div>}>
            <AppContent />
          </Suspense>
          <ToastContainer />
        </Router>
      </ShopContextProvider>
    </UserProvider>
  );
}

function AppContent() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && user.role === "user" && (
        <Suspense fallback={<div>Loading Navbar ...</div>}>
          <Navbar />
        </Suspense>
      )}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={user.role === "admin" ? "/admin/product-management" : "/shop"} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={user.role === "admin" ? "/admin/product-management" : "/shop"} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/shop"
          element={
            user && user.role === "user" ? <Shop /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/cart"
          element={
            user && user.role === "user" ? <Cart /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/checkout"
          element={
            user && user.role === "user" ? <Checkout /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/product-management"
          element={
            user && user.role === "admin" ? (
              <ProductManagement />
            ) : user && user.role === "user" ? (
              <Navigate to="/shop" replace />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
