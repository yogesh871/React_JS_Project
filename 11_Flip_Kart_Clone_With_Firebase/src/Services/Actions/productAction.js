import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

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
    let data = []
    let res = await getDocs(collection(db, "products"));
        res.forEach(rec =>{
                data.push(rec.data());
              })
              dispatch(getAllProducts(data));

};

export const addNewProductAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await setDoc(doc(db, "products", data.id), data);      
    dispatch(addNewProductSuc());
    dispatch(getAllProductsAsync());
  } catch (err) {
    dispatch(addNewProductRej(err.message));
  }
};

export const deleteProductAsync = (id) => async (dispatch) => {
  dispatch(loading());
  try {
     await deleteDoc(doc(db, "products", id));
    dispatch(getAllProductsAsync());
  } catch (err) {
    dispatch(addNewProductRej(err.message));
  }
};


export const getProductAsync = (id) => async (dispatch) => {
  dispatch(loading());

  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const productData = docSnap.data();
      dispatch(getProduct(productData));
    } else {
      dispatch(addNewProductRej("No such document found"));
    }
  } catch (err) {
    dispatch(addNewProductRej(err.message));
  }
};

export const updateProductAsync = (data) => async (dispatch) => {
  dispatch(loading());

  try {
    await setDoc(doc(db, "products", data.id), data);
    dispatch(updateProduct());
  } catch (err) {
    dispatch(addNewProductRej(err.message));
  }
};

export const addToCart = (product) => async (dispatch) => {
  try {
    const productWithQty = { ...product, quantity: 1 };
    await setDoc(doc(db, "cart", productWithQty.id), productWithQty);   

    dispatch(addToCartSuccess(productWithQty));
  } catch (error) {
    console.error("Add to cart failed:", error);
  }
};

export const removeFromCart = (id) => async (dispatch) => {

  try {
    await deleteDoc(doc(db, "cart", id));
    dispatch(removeFromCartSuccess(id));
  } catch (error) {
    console.error("Remove from cart failed:", error);
  }
};

export const getCartItems = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "cart"));
    const cartItems = querySnapshot.docs.map(doc => doc.data());
    dispatch(setCartItems(cartItems));
  } catch (error) {
    console.error("Fetch cart items failed:", error);
  }
};
