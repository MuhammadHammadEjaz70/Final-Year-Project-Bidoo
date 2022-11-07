import axios from "axios";

export const createProduct = async (product, authToken) => {
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: { authToken },
  });
};

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getProductsBySeller = async (userID) =>
  await axios.get(`${process.env.REACT_APP_API}/products-seller`, {
    headers: { userID },
  });
