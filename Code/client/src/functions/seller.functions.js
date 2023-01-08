import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/seller/orders`, {
    headers: {
      authtoken,
    },
  });
export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/seller/order-status`,{
    orderId,orderStatus
  }, {
    headers: {
      authtoken,
    },
  });
