import { combineReducers } from "redux";
import recipeReducer from "./RecipebooksReducer"; 

const rootReducer = combineReducers({
   recipeReducer,
});

export default rootReducer;
