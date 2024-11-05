import React from 'react';
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
          <p>{item.price}</p>
        </div>
      ))}
      <h2>Total: {total}</h2>
    </div>
  );
};

export default ShoppingCart;
