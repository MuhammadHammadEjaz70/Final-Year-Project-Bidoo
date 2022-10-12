import { combineReducers } from "redux";
import userReducer from "./userReducer";
import sellerReducer from "./sellerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  seller: sellerReducer,
});

export default rootReducer;
