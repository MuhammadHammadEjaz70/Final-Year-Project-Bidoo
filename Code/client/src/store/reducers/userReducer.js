const userReducer = (state = null, action) => {
  if (action.type === "LOGGED_IN_USER") {
    return action.payload;
  } else if (action.type === "LOGOUT") {
    return action.payload;
  } else {
    return state;
  }
};

export default userReducer;
