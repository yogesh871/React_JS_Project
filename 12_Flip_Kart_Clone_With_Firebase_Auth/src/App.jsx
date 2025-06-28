import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthStateAsync } from './services/Actions/authAction';
import Header from './Components/Header/Header';
import Home from './Components/Home';
import Sign_In from './Components/FormPage/Sign_In';
import Sign_Up from './Components/FormPage/Sign_Up';
import AddProduct from './Components/AddProduct/AddProduct';
import EditProduct from './Components/EditProduct/EditProduct';
import AddToCart from './Components/AddToCart/AddToCart';
import ProductDetails from './Components/ViewProduct/ProductDetails';
import AllProducts from './Components/AllProductPage/AllProducts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStateAsync());
  }, [dispatch]);

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
        <Route path="/Sign_In" element={<Sign_In />} />
        <Route path="/Sign_Up" element={<Sign_Up />} />
      </Routes>
    </>
  );
}

export default App;