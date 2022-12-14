import axios from "axios";

export const createProduct = async (product, authToken) => {
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: { authToken },
  });
};

export const removeProduct = async (slug, authToken) => {
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: { authToken },
  });
};

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getTotalProducts = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const getProductsBySeller = async (userID) =>
  await axios.get(`${process.env.REACT_APP_API}/products-seller`, {
    headers: { userID },
  });
export const getProductsAdmin = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products-admin`);

export const updateProduct = async (slug, product, authToken) => {
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: { authToken },
  });
};

export const sortProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

export const ProductStar = async (productId, star, authToken) => {
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: { authToken },
    }
  );
};
export const productBidding = async (productId, price, authToken) => {
  await axios.put(
    `${process.env.REACT_APP_API}/product/bid/${productId}`,
    { price },
    {
      headers: { authToken },
    }
  );
};
export const p_status = async (slug, productStatus, authToken) => {
  await axios.put(
    `${process.env.REACT_APP_API}/product-status/${slug}`,
    { productStatus },
    {
      headers: { authToken },
    }
  );
};
export const p_bidStatus = async (slug, productBidStatus) => {
  await axios.put(`${process.env.REACT_APP_API}/product-bidStatus/${slug}`, {
    productBidStatus,
  });
};

export const getRealtedProducts = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByfilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filter`, arg);
