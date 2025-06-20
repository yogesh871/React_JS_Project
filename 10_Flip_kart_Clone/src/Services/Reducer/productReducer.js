import { ADD_TO_CART, REMOVE_FROM_CART, SET_CART_ITEMS, INCREASE_QTY, DECREASE_QTY} from "../Actions/productAction";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  errorMsg: "",
  cartItems: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_SUC":
      return { ...state, isCreated: true };

    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isCreated: false,
        isUpdated: false,
      };

    case "GET_PRODUCT":
      return { ...state, product: action.payload };

    case "UPDATE_PRODUCT_SUC":
      return { ...state, isUpdated: true, product: null };

    case "LOADING":
      return { ...state, isLoading: true };

    case "ADD_PRODUCT_REJ":
      return { ...state, isLoading: false, errorMsg: action.payload };

    case ADD_TO_CART:
      const exists = state.cartItems.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };

    case SET_CART_ITEMS:
      return { ...state, cartItems: action.payload };

    case INCREASE_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        )
      };

    case DECREASE_QTY:
      return {
        ...state,
        cartItems: state.cartItems
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0)
      };

    default:
      return state;
  }
};

export default productReducer;
