import React, { useEffect, useState } from "react";
import { AdminNavigation } from "../../components/nav/AdminNavigation";
import { getOrders, changeStatus } from "../../functions/admin.function";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AllOrders from "../../components/order/AllOrders";

export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };
  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status Updated");
      loadOrders();
    });
  };

  return (
    <>
      <div>
        <>
          <div className="contianer-fluid">
            <div className="row">
              <div className="col-md-2">
                <AdminNavigation />
              </div>
              <div className="col-md-10">
                <div className="col display-5">Admin Dashboard</div>
                {/* {JSON.stringify(orders)} */}
                <AllOrders
                  orders={orders}
                  handleStatusChange={handleStatusChange}
                />
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
