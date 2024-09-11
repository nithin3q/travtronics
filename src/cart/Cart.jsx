import React, { useContext } from 'react';
import { ShopContext } from '../Context/Shopcontext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartitems, products } = useContext(ShopContext);
  const totalAmount = products.reduce((total, product) => {
    if (cartitems[product.id] > 0) {
      return total + product.price * cartitems[product.id];
    }
    return total;
  }, 0);
  
  const navigate = useNavigate();

  return (
    <div className="container mt-5" style={{ paddingTop: '5px' }}>
      <h1 className="text-center mt-5">Your Cart Items</h1>
      <div className="cart">
        {products.map((product) => {
          if (cartitems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null;
        })}
      </div> 
      {totalAmount > 0 ? (
        <div className="text-center mt-3">
          <p>Subtotal: ₹ {totalAmount}</p>
          <button className="btn btn-primary mx-2" onClick={() => navigate('/shop')}>Continue Shopping</button>
          <button className="btn btn-success mx-2" onClick={() => navigate('/checkout')}>Checkout</button>
        </div>):(
          <div className="text-center mt-3">
          <h1 className='text-center mt-5'>Your cart is empty</h1>
          <button className="btn btn-primary mx-2 mt-3" onClick={() => navigate('/shop')}>Back to Shopping</button>
        </div>)}
    
    </div>
  );
}

export default Cart;
