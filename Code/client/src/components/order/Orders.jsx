import React from "react";

const Orders = ({ orders, handleStatusChange }) => {
  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <h5>Order Id: {order.paymentIntent.id}</h5>
        {showOrderInTable(order)}
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

            <td> {order.paymentIntent.status.toUpperCase()}</td>
            <td>{order.paymentIntent.payment_method_types[0]}</td>
            <td>
              {new Date(order.paymentIntent.created * 1000).toLocaleString()}
            </td>
            <td>{order.orderStatus}</td>
            <td>${p.product.buyoutPrice}</td>
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
      <br />{" "}
      <div className="row">
        <div className="col-md-4">Delivery Status</div>
        <div className="col-md-8">
          <select
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="form-control "
            defaultValue={order.orderStatus}
            name="status"
            style={{ border: "solid 2px black" }}
          >
            <option value="Not Processed">Not Processed</option>
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4">Delivery Address</div>
        <div className="col-md-8">
          <td style={{ border: "solid 2px Black", borderRadius: "30px" }}>
            {order.orderdBy.address}
          </td>
        </div>
      </div>
    </table>
  );
  return (
    <>
      <div className="contianer-fluid">
        <div className="row">
          <div className="col text-center">
            <h4>
              {/* {orders.length > 0 ? "User Purchase History" : "No Purchase"} */}
            </h4>

            {showEachOrders()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
