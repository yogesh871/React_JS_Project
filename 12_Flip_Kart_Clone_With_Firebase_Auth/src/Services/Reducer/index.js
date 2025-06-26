import { combineReducers } from 'redux';
import productReducer from './productReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  productReducer,
  authReducer
});

export default rootReducer;
