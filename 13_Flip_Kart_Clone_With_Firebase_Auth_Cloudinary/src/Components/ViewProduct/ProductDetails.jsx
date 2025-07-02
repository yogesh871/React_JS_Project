import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../Services/Actions/productAction';
import {
  BsCart3,
  BsArrowLeft,
  BsStarFill,
  BsStarHalf,
  BsStar
} from 'react-icons/bs';
import {
  FaRupeeSign,
  FaShieldAlt,
  FaExchangeAlt,
  FaCreditCard
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.authReducer);

  const product = products.find((p) => p.id === id);

  if (!product) return <p className="text-center m-5">Product not found.</p>;

  const rating = product.rating || Math.random() * 2 + 3;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const showToast = () => {
    toast.success(
      <div className="d-flex align-items-center">
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            marginRight: '10px',
            borderRadius: '6px'
          }}
        />
        <div>
          <strong>{product.name}</strong><br />
          added to cart!
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product));
      showToast();
    } else {
      navigate('/Sign_Up');
    }
  };

 

  return (
    <div className="product-details-container flipkart-style">
      <ToastContainer />

      <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">
          <BsArrowLeft /> Back to Home
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.category}</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-card-horizontal">
        <div className="image-gallery">
          <div className="thumbnail-container">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="thumbnail">
                <img src={product.image} alt={`Thumbnail ${i}`} />
              </div>
            ))}
          </div>
          <div className="main-image-box">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="info-box-horizontal">
          <h1 className="product-title-add">{product.name}</h1>

          <div className="rating-section">
            <div className="star-rating">
              {[...Array(fullStars)].map((_, i) => (
                <BsStarFill key={`full-${i}`} className="star filled" />
              ))}
              {hasHalfStar && <BsStarHalf className="star half" />}
              {[...Array(emptyStars)].map((_, i) => (
                <BsStar key={`empty-${i}`} className="star empty" />
              ))}
              <span className="rating-text">{rating.toFixed(1)}</span>
            </div>
            <span className="reviews-count">12,543 Ratings & 2,879 Reviews</span>
            <span className="extra-info">Extra ₹5,000 off</span>
          </div>

          <div className="price-section">
            <div className="current-price">
              <FaRupeeSign className="rupee-icon" />
              <span className="price-amount">{product.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="original-price">
              <FaRupeeSign className="rupee-icon" />
              <span>{(product.price * 1.3).toLocaleString('en-IN')}</span>
            </div>
            <div className="discount-percent">30% off</div>
          </div>

          

          <div className="highlights-section">
            <h3>Highlights</h3>
            <ul>
              <li>High-quality material for durability</li>
              <li>Ergonomic design for comfort</li>
              <li>Easy to use and maintain</li>
              <li>1 year manufacturer warranty</li>
            </ul>
          </div>
          <div className="quick-cart-actions d-flex gap-3 mb-4">
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              <BsCart3 /> ADD TO CART
            </button>
           
            </div>
          <div className="seller-section">
            <h3>Seller</h3>
            <div className="seller-info">
              <span className="seller-name">SuperComNet</span>
              <span className="seller-rating">
                4.5 <BsStarFill className="seller-star" />
              </span>
            </div>
            <div className="seller-actions">
              <span className="view-more">
                View more sellers starting from ₹{product.price - 200}
              </span>
            </div>
          </div>
          

          <div className="assurance-section">
            <div className="assurance-item">
              <FaShieldAlt className="assurance-icon" />
              <span>1 Year Warranty</span>
            </div>
            <div className="assurance-item">
              <FaExchangeAlt className="assurance-icon" />
              <span>7 Days Replacement</span>
            </div>
            <div className="assurance-item">
              <FaCreditCard className="assurance-icon" />
              <span>Secure Payment</span>
            </div>
          </div>

     
            </div>
          </div>
    </div>
  );
};

export default ProductDetails;
