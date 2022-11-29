import { combineReducers } from "redux";
import {userReducer} from "./userReducer";
 
import searchReducer from "./searchReducer";

//combine all the reducer in the redux store

const rootReducer = combineReducers({
 
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;
