import React, { useContext } from 'react';
import { ShopContext } from '../Context/Shopcontext';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Checkout.css'; // Import a CSS file for styling

function Checkout() {
  const { cartitems, getTotalCartAmount, updateCartItemsCount, products } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Simulate the checkout process
    for (const itemId in cartitems) {
      updateCartItemsCount(0, itemId);
    }
    alert('Order placed successfully! Thank you for shopping.');
    navigate('/shop'); // Redirect to confirmation page
  };

  return (
    <div className="checkout-container">
      <h1 className="text-center mt-5">Checkout</h1>
      {totalAmount > 0 ? (
        <div className="checkout-content mt-3">
          <h2 className="text-center mb-4">Review Your Cart</h2>
          <div className="cart-items">
            {products.map((product) => {
              if (cartitems[product.id] !== 0) {
                return (
                  <div key={product.id} className="cart-item">
                    <div className="cart-item-details">
                      <h5>{product.productName}</h5>
                      <p>Quantity: {cartitems[product.id]}</p>
                      <p>Price: ₹ {product.price * cartitems[product.id]}</p>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <h3 className="mt-4 text-center">Subtotal: ₹ {totalAmount}</h3>
          <div className="checkout-buttons text-center mt-4">
            <button className="btn btn-primary mx-2" onClick={() => navigate('/cart')}>
              Back to Cart
            </button>
            <button className="btn btn-success mx-2" onClick={handleCheckout}>
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart text-center mt-5">
          <h1>Your cart is empty</h1>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/shop')}>
            Back to Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
