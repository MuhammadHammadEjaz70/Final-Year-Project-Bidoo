import { combineReducers } from "redux";
import userReducer from "./userReducer";
import sellerReducer from "./sellerReducer";

const rootReducer = combineReducers({
  seller: sellerReducer,
  user: userReducer,
});

export default rootReducer;
