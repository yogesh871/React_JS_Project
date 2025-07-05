import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductAsync } from '../../Services/Actions/productAction';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';
import { ToastContainer, toast } from 'react-toastify';
import { UploadImage } from "../../Services/Cloudinary";
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.user);

  const [product, setProduct] = useState({
    id: '',
    name: '',
    desc: '',
    price: '',
    image: '',
    category: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user?.uid) {
      navigate('/Sign_In');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.price) newErrors.price = 'Product price is required';
    else if (product.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!product.desc.trim()) newErrors.desc = 'Description is required';
    if (!product.image.trim()) newErrors.image = 'Image URL is required';
    if (!product.category) newErrors.category = 'Please select a category';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const productWithId = {
      ...product,
      id: Math.floor(Math.random() * 100000).toString(),
      uid: user.uid,
    };

    dispatch(addNewProductAsync(productWithId));
    toast.success('Product Added Successfully!', { autoClose: 2500 });

    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadedUrl = await UploadImage(file);
    if (uploadedUrl) {
      setProduct((prev) => ({ ...prev, image: uploadedUrl }));
    } else {
      alert("Image upload failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="product-form-container">
        <div className="form-card">
          <h2 className="form-title">
            <span className="title-icon">+</span> Add New Product
          </h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="d-flex gap-3">
              <div className="form-group w-50">
                <label htmlFor="name" className="form-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product.name}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.name && <small className="error-text">{errors.name}</small>}
              </div>

              <div className="form-group w-50">
                <label htmlFor="price" className="form-label">Product Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.price && <small className="error-text">{errors.price}</small>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="desc" className="form-label">Product Description</label>
              <textarea
                name="desc"
                id="desc"
                value={product.desc}
                onChange={handleChange}
                className="form-input"
              />
              {errors.desc && <small className="error-text">{errors.desc}</small>}
            </div>

            
          <div className="form-group">
            <label htmlFor="image" className="form-label">Product Image</label>
            <input type="file" name="image" id="image" onChange={handleFileUpload} className="form-input" />
            {product.image && (
              <img src={product.image} alt="preview" style={{ width: '100px', marginTop: '10px' }} />
            )}
          </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">Product Category</label>
              <select
                name="category"
                id="category"
                value={product.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="" disabled>Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Furniture">Home & Furniture</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Books">Books</option>
                <option value="Grocery">Grocery</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Toys & Baby Products">Toys & Baby Products</option>
              </select>
              {errors.category && <small className="error-text">{errors.category}</small>}
            </div>

            <button type="submit" className="submit-btn">
              <span className="btn-text">Add Product</span>
              <span className="btn-icon">→</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
