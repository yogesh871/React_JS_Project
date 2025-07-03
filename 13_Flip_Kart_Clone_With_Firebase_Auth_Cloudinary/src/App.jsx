import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Order from './Components/Order/Order';



function App() {
  const { user } = useSelector((state) => state.authReducer);

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
        {user ? ( <Route path="/Add_Product" element={<AddProduct />} />) :  ( <Route path="/Add_Product" element={<Sign_In />} />)}
       
        <Route path="/editproduct/:id" element={<EditProduct />} />
        {user ? ( <Route path="/Add_To_Cart" element={<AddToCart />}  />) :  ( <Route path="/Add_To_Cart" element={<Sign_In />} />)}
       
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/allproducts" element={<AllProducts searchQuery={searchQuery} />} />
        <Route path="/Sign_In" element={<Sign_In />} />
        <Route path="/Sign_Up" element={<Sign_Up />} />
        {user ? ( <Route path="/order" element={<Order />} /> ) :  ( <Route path="/order" element={<Sign_In />} />)}
       
      
        

      </Routes>
    </>
  );
}

export default App;