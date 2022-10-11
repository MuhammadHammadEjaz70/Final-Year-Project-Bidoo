import axios from "axios";

export const createUpdateUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-update-user`,
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

export const createUpdateSeller = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-update-seller`,
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

export const currentSeller = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-seller`,
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
