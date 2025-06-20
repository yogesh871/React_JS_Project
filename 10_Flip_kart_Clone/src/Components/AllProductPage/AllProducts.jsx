import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import {  FaEye } from 'react-icons/fa'; 

import {
  getAllProductsAsync,
  addToCart,
} from '../../Services/Actions/productAction';
import '../Home.css';

const AllProducts = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useSelector((state) => state.productReducer);

  const queryParams = new URLSearchParams(location.search);
  const category = decodeURIComponent(queryParams.get('category') || '');

  const [selectedPrice, setSelectedPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) dispatch(getAllProductsAsync());
  }, [dispatch, products.length]);

  useEffect(() => {
    filterProducts();
  }, [products, category, selectedPrice, searchQuery]);

  const filterProducts = () => {
    let updated = [...products];

    if (category) {
      updated = updated.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (selectedPrice) {
      let [min, max] = selectedPrice.split('-').map(Number);
      if (!max) max = Infinity;
      updated = updated.filter((p) => {
        const price = parseInt(p.price, 10);
        return price >= min && price <= max;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      updated = updated.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.desc.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(updated);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };


  return (
    <div className="bg-white py-4 my-2 mx-2">
      <h2 className="text-center mb-4">
        All Products {category && `— ${category}`}
      </h2>

      <div className="d-flex justify-content-end m-3 mb-5">
        <select
          className="price-filter"
          onChange={(e) => setSelectedPrice(e.target.value)}
          value={selectedPrice}
        >
          <option value=''>All Prices</option>
          <option value='0-1000'>Less Than ₹1000</option>
          <option value='1000-5000'>₹1000 - ₹5000</option>
          <option value='5000-10000'>₹5000 - ₹10000</option>
          <option value='10000-15000'>₹10000 - ₹15000</option>
          <option value='15000-20000'>₹15000 - ₹20000</option>
          <option value='20000'>More Than ₹20000</option>
        </select>
      </div>

      <div className="horizontal-scroll">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="action-buttons d-flex flex-column">
                  

                  <button
                    className="icon-btn view-btn"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <FaEye className="fs-5" style={{ color: '#157347' }} />
                  </button>

                </div>
              </div>

              <div className="product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-desc" title={product.desc}>
                  {product.desc.length > 60
                    ? product.desc.slice(0, 60) + '...'
                    : product.desc}
                </p>
                <p className="product-price">₹{product.price}</p>
                <Button
                  variant="success"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart <BsCart3 className="fs-6 ms-1" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
