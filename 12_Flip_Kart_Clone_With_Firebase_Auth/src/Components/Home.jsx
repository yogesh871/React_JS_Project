import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import {
  getAllProductsAsync,
  deleteProductAsync,
} from '../Services/Actions/productAction';
import TitleProduct from './TitleProduact/TitleProduct';
import SliderProduct from './SliderProduct/SliderProduct';
import './Home.css';
import { Button } from 'react-bootstrap';

const Home = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productReducer);

  const [selectedPrice, setSelectedPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;
  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    filterProducts();
  }, [products, selectedPrice, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPrice, searchQuery]);

  const filterProducts = () => {
    let updated = [...products];

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

  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id));
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/editproduct/${id}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/allproducts?category=${encodeURIComponent(category)}`);
  };

  // Pagination calculations
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <TitleProduct />
      <SliderProduct />

      <div className='d-flex justify-content-end m-3'>
        <select
          className='price-filter'
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

      <div className="bg-white py-4 my-2 mx-2">
        <div className="horizontal-scroll">
          {currentProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => handleCategoryClick(product.category)}
              style={{ cursor: 'pointer' }}
            >
              <div className="image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="action-buttons d-flex flex-column">
                  <button
                    className="icon-btn delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product.id);
                    }}
                  >
                    <i
                      className="fa-solid fa-xmark"
                      style={{ color: '#157347' }}
                    />
                  </button>

                  <button
                    className="icon-btn share-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    <FaEye className="fs-5" style={{ color: '#157347' }} />
                  </button>

                  <button
                    className="icon-btn edit-btn"
                    onClick={(e) => handleEdit(product.id, e)}
                  >
                    <BsPencilSquare
                      className="fs-5"
                      style={{ color: '#157347' }}
                    />
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
              </div>
            </div>
          ))}
        </div>

      <div className="d-flex justify-content-center my-3">
        <Button variant='outline-success'> prev</Button>
        {Array.from({ length: totalPages }, (_, index) => ( 
          <button 
          key={index + 1}
          className={`btn mx-1 ${currentPage === index + 1 ? 'btn-success' : 'btn-outline-success'
        }`}
        onClick={() => setCurrentPage(index + 1)}
        >
            {index + 1}
          </button>
        
        ))}
             <Button variant='outline-success'> Next</Button>

      </div>
        </div>
    </>
  );
};

export default Home;
