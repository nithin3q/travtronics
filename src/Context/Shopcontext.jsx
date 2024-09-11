import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  // Initialize cart with default values, but without products
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
        // Initialize cart with products
        setCartItems((prev) => {
          let newCart = { ...prev };
          response.data.forEach(product => {
            if (!newCart[product.id]) {
              newCart[product.id] = 0;
            }
          });
          return newCart;
        });
        setLoading(false); // Set loading to false once products are fetched
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false); // Ensure loading is false even if there's an error
      });
  }, []);

  useEffect(() => {
    // Save cart items to local storage whenever they change
    localStorage.setItem('cartitems', JSON.stringify(cartitems));
  }, [cartitems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartitems) {
      if (cartitems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        // Check if itemInfo exists before accessing its properties
        if (itemInfo) {
          totalAmount += cartitems[item] * itemInfo.price;
        }
      }
    }
    console.log(totalAmount);
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemsCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const contextValue = {
    cartitems,
    removeFromCart,
    addToCart,
    updateCartItemsCount,
    getTotalCartAmount,
    products,
    loading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
