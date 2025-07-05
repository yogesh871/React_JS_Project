import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { getProductAsync, updateProductAsync } from "../../Services/Actions/productAction";
import "../AddProduct/AddProduct.css";
import { BsPencilSquare } from 'react-icons/bs';
import { UploadImage } from "../../Services/Cloudinary";
import { ToastContainer, toast } from "react-toastify";
import { getProductAsync, updateProductAsync } from "../../Services/Actions/productAction";



const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isUpdated } = useSelector((state) => state.productReducer);

  const [form, setForm] = useState({
    id: "",
    name: "",
    desc: "",
    price: "",
    image: "",
    category: ""
  });

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  useEffect(() => {
    setTimeout(() => {
      
      if (isUpdated) navigate("/");
    }, 2500);
  }, [isUpdated]);

  const notify = () => toast.success("Product Edit Successfully!",  {autoClose: 2500});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync(form));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadedUrl = await UploadImage(file);
    if (uploadedUrl) {
      setForm((prev) => ({ ...prev, image: uploadedUrl }));
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
        <span className="title-icon"> <BsPencilSquare className="fs-5"/></span> Edit Product
      </h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="d-flex gap-3">
          <div className="form-group w-50">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group w-50">
            <label htmlFor="price" className="form-label">Product Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={form.price}
              onChange={handleChange}
              className="form-input"
              required
              />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="desc" className="form-label">Product Description</label>
          <textarea
            name="desc"
            id="desc"
            value={form.desc}
            onChange={handleChange}
            className="form-input"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="image" className="form-label">Product Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileUpload}
              className="form-input"
            />
            {form.image && (
              <img src={form.image} alt="preview" style={{ width: '100px', marginTop: '10px' }} />
            )}
          </div>


        <div className="form-group">
          <label htmlFor="category" className="form-label">Product Category</label>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            className="form-select"
            required
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
        </div>

        <button type="submit" className="submit-btn" onClick={notify}>
          <span className="btn-text">Update Product</span>
          <span className="btn-icon">✔</span>
        </button>
      </form>
    </div>
  </div>
            </>




  )
}
export default EditProduct;
