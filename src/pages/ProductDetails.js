// src/pages/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover rounded-md mb-4 md:mb-0"
        />
        <div className="md:ml-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{product.title}</h2>
          <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-sm text-gray-600 mb-4">Rating: {product.rating?.rate} stars ({product.rating?.count} reviews)</p>
          <p className="text-lg font-bold text-green-600 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
