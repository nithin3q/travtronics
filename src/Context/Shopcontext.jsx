import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  return cart;
};

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartitems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartitems');
    return savedCart ? JSON.parse(savedCart) : getDefaultCart();
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from JSON Server
    axios.get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data);
        setCartItems((prev) => {
          let newCart = { ...prev };
          response.data.forEach(product => {
            if (!newCart[product.id]) {
              newCart[product.id] = 0;
            }
          });
          return newCart;
        });
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    // Save cart items to local storage whenever they change
    localStorage.setItem('cartitems', JSON.stringify(cartitems));
  }, [cartitems]);


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));
  };

  const updateCartItemsCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const contextValue = {
    cartitems,
    removeFromCart,
    addToCart,
    updateCartItemsCount,
    products,
    loading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
