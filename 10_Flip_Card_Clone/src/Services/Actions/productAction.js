import axios from 'axios';

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_CART_ITEMS = "SET_CART_ITEMS";
export const INCREASE_QTY = "INCREASE_QTY";
export const DECREASE_QTY = "DECREASE_QTY";

export const addNewProductSuc = () => ({ type: "ADD_PRODUCT_SUC" });
export const addNewProductRej = (error) => ({ type: "ADD_PRODUCT_REJ", payload: error });
export const getAllProducts = (products) => ({ type: "GET_ALL_PRODUCTS", payload: products });
export const loading = () => ({ type: "LOADING" });
export const getProduct = (data) => ({ type: "GET_PRODUCT", payload: data });
export const updateProduct = () => ({ type: "UPDATE_PRODUCT_SUC" });

export const addToCartSuccess = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCartSuccess = (id) => ({ type: REMOVE_FROM_CART, payload: id });
export const setCartItems = (items) => ({ type: SET_CART_ITEMS, payload: items });

export const increaseQty = (id) => ({
  type: INCREASE_QTY,
  payload: id,
});

export const decreaseQty = (id) => ({
  type: DECREASE_QTY,
  payload: id,
});

export const getAllProductsAsync = () => async (dispatch) => {
  dispatch(loading());
  try {
    const res = await axios.get("http://localhost:3000/products");
    dispatch(getAllProducts(res.data));
  } catch (err) {
    dispatch(addNewProductRej(err.message));
  }
};

export const addNewProductAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.post("http://localhost:3000/products", data);
    dispatch(addNewProductSuc());
    dispatch(getAllProductsAsync());
  } catch (err) {
    dispatch(addNewProductRej(err.message));
  }
};

export const deleteProductAsync = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.delete(`http://localhost:3000/products/${id}`);
    dispatch(getAllProductsAsync());
  } catch (err) {
    dispatch(addNewProductRej(err.message));
  }
};

export const getProductAsync = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const res = await axios.get(`http://localhost:3000/products/${id}`);
    dispatch(getProduct(res.data));
  } catch (err) {
    dispatch(addNewProductRej(err.message));
  }
};

export const updateProductAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.put(`http://localhost:3000/products/${data.id}`, data);
    dispatch(updateProduct());
  } catch (err) {
    dispatch(addNewProductRej(err.message));
  }
};

export const addToCart = (product) => async (dispatch) => {
  try {
    const productWithQty = { ...product, quantity: 1 };
    await axios.post("http://localhost:3000/cart", productWithQty);
    dispatch(addToCartSuccess(productWithQty));
  } catch (error) {
    console.error("Add to cart failed:", error);
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/cart/${id}`);
    dispatch(removeFromCartSuccess(id));
  } catch (error) {
    console.error("Remove from cart failed:", error);
  }
};

export const getCartItems = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3000/cart");
    dispatch(setCartItems(res.data));
  } catch (error) {
    console.error("Fetch cart items failed:", error);
  }
};
