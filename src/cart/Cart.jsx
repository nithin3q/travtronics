import React, { useContext } from 'react';
import { ShopContext } from '../Context/Shopcontext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartitems, getTotalCartAmount, products, loading } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const hasItems = products.some((product) => cartitems[product.id] > 0);

  return (
    <div className="container mt-5" style={{ paddingTop: '5px' }}>
      <h1 className="text-center mt-5">Your Cart Items</h1>
      <div className="cart">
        {hasItems ? (
          products.map((product) => {
            if (cartitems[product.id] !== 0) {
              return <CartItem key={product.id} data={product} />;
            }
            return null;
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {totalAmount > 0 ? (
        <div className="text-center mt-3">
          <p>Subtotal: ₹ {totalAmount}</p>
          <button className="btn btn-primary mx-2" onClick={() => navigate('/shop')}>Continue Shopping</button>
          <button className="btn btn-success mx-2" onClick={() => navigate('/checkout')}>Checkout</button>
        </div>
      ) : (
        <div className="text-center mt-3">
          <h1 className='text-center mt-5'>Your cart is empty</h1>
          <button className="btn btn-primary mx-2 mt-3" onClick={() => navigate('/shop')}>Back to Shopping</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
