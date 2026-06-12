import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/products.jsx';
import ProductDetail from './pages/productDetail.jsx';
import Home from './pages/homepage.jsx';
import Login from './pages/login.jsx';
import Wishlist from './pages/wishlist.jsx';
import Cart from './pages/cart.jsx';
import Profile from './pages/profile.jsx';

import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminAddProduct from './pages/admin/AdminAddProduct.jsx';
import AdminBookings from './pages/admin/AdminBookings.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminProductDetail from './pages/admin/AdminProductDetail.jsx';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/wishlist/add/:id" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AdminAddProduct />} />
          <Route path="products/edit/:id" element={<AdminAddProduct />} />
          <Route path="products/view/:id" element={<AdminProductDetail />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </BrowserRouter>

   );
}


export default App
