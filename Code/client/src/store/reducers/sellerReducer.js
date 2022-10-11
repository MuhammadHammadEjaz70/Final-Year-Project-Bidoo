const sellerReducer = (state = null, action) => {
  if (action.type === "LOGGED_IN_SELLER") {
    return action.payload;
  } else if (action.type === "LOGOUT") {
    return action.payload;
  } else {
    return state;
  }
};

export default sellerReducer;
