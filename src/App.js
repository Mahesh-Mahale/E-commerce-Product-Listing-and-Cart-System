// import './App.css';
// import React, { lazy, Suspense } from 'react';

// const ProductList = lazy(() => import('../src/pages/ProductList'));

// function App() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ProductList />
//     </Suspense>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> {/* Cart Page Route */}

      </Routes>
    </Router>
  );
};

export default App;

