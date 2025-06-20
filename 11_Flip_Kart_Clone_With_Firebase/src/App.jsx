// App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddProduct from './Components/AddProduct/AddProduct';
import EditProduct from './Components/EditProduct/EditProduct';
import AddToCart from './Components/AddToCart/AddToCart';
import Header from './Components/Header/Header';
import AllProducts from './Components/AllProductPage/AllProducts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductDetails from './Components/ViewProduct/ProductDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/Add_Product" element={<AddProduct />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/Add_To_Cart" element={<AddToCart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/allproducts" element={<AllProducts searchQuery={searchQuery} />} />

      </Routes>
    </>
  );
}

export default App;
