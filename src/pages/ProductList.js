import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import './ProductList.css'; 
import { Link } from 'react-router-dom';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Number of products per page
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [sortOption, setSortOption] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure data is defined before setting it in state
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [category, priceRange, rating, sortOption, products]);


  const applyFiltersAndSorting = () => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (rating) {
      filtered = filtered.filter(product => product.rating.rate >= rating);
    }

    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(filtered);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products'); 
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Handle pagination button click
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  return (
    <div className="container mx-auto p-4">
      {/* Filters */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <select className="p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>

        <div>
          <label className="block mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
        </div>

        <select className="p-2 border rounded" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="0">All Ratings</option>
          <option value="3">3 Stars & Up</option>
          <option value="4">4 Stars & Up</option>
        </select>

        <select className="p-2 border rounded" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>

        <Link to="/cart" className="text-blue-500 hover:text-blue-700">
          View Cart
        </Link>
      </div>

      {/* Product List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
           <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
              </Link>
            <p className="text-sm text-gray-600 mb-4">Rating: {product.rating.rate} stars</p>
            <p className="text-lg font-bold text-green-600 mb-4">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>


   {/* Pagination Controls */}
   {totalPages > 1 && (
        <div className="flex justify-center my-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-4 py-2 rounded-md ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

    </div>

  );
};

export default ProductList;