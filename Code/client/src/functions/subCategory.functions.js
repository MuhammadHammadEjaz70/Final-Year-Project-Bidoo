import axios from "axios";

export const getAllSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/sub-categories`);

export const getSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub-category/${slug}`);

export const removeSubCategory = async (slug, authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub-category/${slug}`, {
    headers: { authToken },
  });
export const updateSubCategory = async (slug, subCategory, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/sub-category/${slug}`,
    subCategory,
    {
      headers: { authToken },
    }
  );

export const createSubCategory = async (subCategory, authToken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub-category`, subCategory, {
    headers: { authToken },
  });
