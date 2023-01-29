import React, { useEffect, useState } from "react";
import SellerNavigation from "../../components/nav/SellerNavigation";
import { getOrders } from "../../functions/seller.functions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
var _ = require("lodash");

export const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  // let count = 0;
  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      // console.log(user._id);
      console.log(
        "results from backedn--->",
        JSON.stringify(res.data, null, 4)
      );
      // count++;
      // console.log("count", count);
      // console.log(res.data.products.product.sellerID);
      // const unique = _.uniqWith(res.data, _.isEqual);
      setOrders(res.data);
      // console.log("all orders===>", orders);
      // console.log("all orders unique===>", unique);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <SellerNavigation />
        </div>
        <div className="col">
          <h4>Seller Dashboard</h4>
          {/* {JSON.stringify(orders)} */}

          <Orders orders={orders} />
        </div>
      </div>
    </div>
  );
};
