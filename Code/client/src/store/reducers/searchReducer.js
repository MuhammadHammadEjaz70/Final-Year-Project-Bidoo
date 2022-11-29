// export const searchReducer = (state = { text: "" }, action) => {
//   switch (action.type) {
//     case "SEARCH_QUERY":
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };

const searchReducer = (state = { text: "" }, action) => {
  if (action.type === "SEARCH_QUERY") {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
};

export default searchReducer;
