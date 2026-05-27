import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/products.jsx';
import ProductDetail from './pages/productDetail.jsx';
import Home from './pages/homepage.jsx';
import Login from './pages/login.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
   );
}


export default App
