import React from 'react';
import { useParams, Link,  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../Services/Actions/productAction';
import { BsCart3 } from 'react-icons/bs';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.authReducer);

  const product = products.find(p => p.id === id);

  if (!product) return <p className="text-center m-5">Product not found.</p>;

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product));
      navigate('/Add_To_Cart');
    } else {
      navigate('/Sign_Up');
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-card-horizontal">
        <div className="image-box-horizontal">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="info-box-horizontal">
          <h2>{product.name}</h2>
          <p className="category">Category: <span>{product.category}</span></p>
          <p className="desc">{product.desc}</p>
          <p className="price">₹{product.price}</p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <BsCart3 /> Add to Cart
          </button>
          <Link to="/" className="back-home">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
