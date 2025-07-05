const initialState = {
  user: null,
  isCreated: false,
  errorMSG: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN_SUC":
      return { ...state, user: action.payload, isCreated: false };
    case "SIGN_OUT_SUC":
      return { ...state, user: null };
    case "SIGN_UP_SUC":
      return { ...state, isCreated: true };
    case "ERROR":
      return { ...state, errorMSG: action.payload };
    default:
      return state;
  }
};

export default authReducer;