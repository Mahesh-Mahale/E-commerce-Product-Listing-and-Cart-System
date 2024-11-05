// src/pages/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total cost of items in the cart
  const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return <p className="text-center mt-10 text-gray-600">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shopping Cart</h2>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-300 py-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-grow ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">Price: ${item.price}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <span className="text-xl font-bold text-gray-800">Total Cost:</span>
          <span className="text-2xl font-bold text-green-600">${totalCost}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
