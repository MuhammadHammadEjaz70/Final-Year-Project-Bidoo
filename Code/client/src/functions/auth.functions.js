import axios from "axios";

export const createUpdateUser = async (authToken,name) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-update-user`,

    { name },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {
      //request body
    },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const currentAdmin = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {
      //request body
    },
    {
      headers: {
        authToken,
      },
    }
  );
};
