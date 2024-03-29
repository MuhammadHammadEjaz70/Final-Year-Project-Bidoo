import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
export const userBidCart = async (product, bidPostedBy) =>
  await axios.post(`${process.env.REACT_APP_API}/user/bidCart`, {
    product,
    bidPostedBy,
  });

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });
export const getUserBidCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/bidCart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });
export const emptyUserBidCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/bidCart`, {
    headers: {
      authtoken,
    },
  });

// const saveAddressToDb = async (e) => {
//   e.preventDefault();
//   console.log(
//     "ADDRESS INPUT FROM USER ===> ",
//     address,
//     city,
//     state,
//     postalCode,
//     country
//   );

//   const res = await axios.post(
//     `http://localhost:8000/api/user/address`,
//     { address, city, state, postalCode, country },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
// };

export const saveUserAddress = async (authtoken, completeAddress) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { completeAddress },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getBidsList = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/bids`, {
    headers: {
      authtoken,
    },
  });

export const removeBidlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/bids/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToBidslist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/bids`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCashOrderForUser = async (authtoken, COD) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { COD },
    {
      headers: {
        authtoken,
      },
    }
  );
