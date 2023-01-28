import React from "react";

const AllOrders = ({ orders }) => {
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

export default AllOrders;
