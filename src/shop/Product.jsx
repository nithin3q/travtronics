import React, { useContext } from 'react';
import { ShopContext } from '../Context/Shopcontext';
import { toast } from 'react-toastify';
import { Card, Button } from 'react-bootstrap';
import '../assets/css/Product.css'; // Import a custom CSS file for additional styling

function Product({ value }) {
  const { id, productName, price, productImage } = value;
  const { cartitems, addToCart } = useContext(ShopContext);
  const cartItemsAmount = cartitems[id] || 0;

  const handleAddToCart = () => {
    addToCart(id);
    toast.success(`${productName} added to cart!`, {
      position: "top-right",
      autoClose: 1500, // Notification closes after 1.5 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Card className="product-card mb-3 shadow-sm " style={{ width: '18rem', maxHeight: '55rem', transition: 'box-shadow 0.3s ease-in-out' }}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '20rem' }}>
        <Card.Img variant="top" src={productImage} style={{ width: '150px', objectFit: 'cover' }} alt={productName} />
      </div>
      <Card.Body>
        <Card.Title className="text-truncate" title={productName}>{productName}</Card.Title>
        <Card.Text className="text-muted">₹ {price}</Card.Text>
        <Button
          variant="primary"
          className="w-100"
          onClick={handleAddToCart}
        >
          Add to cart {cartItemsAmount > 0 && <>({cartItemsAmount})</>}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
