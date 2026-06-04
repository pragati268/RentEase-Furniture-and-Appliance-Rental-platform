import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/products.jsx';
import ProductDetail from './pages/productDetail.jsx';
import Home from './pages/homepage.jsx';
import Login from './pages/login.jsx';
import Wishlist from './pages/wishlist.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/wishlist/add/:id" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
   );
}


export default App
