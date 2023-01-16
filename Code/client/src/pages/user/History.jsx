import React, { useState, useEffect } from "react";
import UserNavigation from "../../components/nav/UserNavigation";
import { getUserOrders } from "../../functions/user";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <h5>Order Id: {order.paymentIntent.id}</h5>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{/* <p>Download pdf</p> */}</div>
        </div>
      </div>
    ));

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          {/* <th scope="col">Price</th> */}
          {/* <th scope="col">BuyOut Price</th> */}
          <th scope="col">Payment</th>
          <th scope="col">Payment Method</th>
          <th scope="col">Ordered On</th>
          <th scope="col">Ordere Status</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            {/* <td>${p.product.price}</td> */}

            <td> {order.paymentIntent.status.toUpperCase()}</td>
            <td>{order.paymentIntent.payment_method_types[0]}</td>
            <td>
              {new Date(order.paymentIntent.created * 1000).toLocaleString()}
            </td>
            <td>{order.orderStatus}</td>
            <td>${p.product.buyoutPrice}</td>
            {/* <td>
              {" "}
              {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td> */}
          </tr>
        ))}
      </tbody>
      <br />
      <div className="row">
        <div className="col-md-4">Total Amount</div>
        <div className="col-md-8">
          <td style={{ border: "solid 2px black" }}>
            {" "}
            {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </td>
        </div>
      </div>
    </table>
  );

  return (
    <>
      <div className="contianer-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNavigation />
          </div>
          <div className="col text-center">
            <h4>
              {orders.length > 0 ? "User Purchase History" : "No Purchase"}
            </h4>

            {showEachOrders()}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
