import React from "react";

const Orders = ({ orders }) => {
  let total = 0;
  console.log(
    "orders in orders componenet===>",
    JSON.stringify(orders, null, 4)
  );
  const showEachOrders = () =>
    orders.map((product, i) => (
      <div key={i} className="m-5 p-3 card">
        <h5>Order Id: {product.paymentIntent.id}</h5>
        {showOrderInTable(product)}
        {/* {calculateTotal(order)} */}
      </div>
    ));
  // const calculateTotal = (order) => {
  //   order.map((p, i) => {
  //     total = total + p.price;
  //   });
  // };

  const showOrderInTable = (product) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Ordered By</th>
          {/* <th scope="col">BuyOut Price</th> */}
          <th scope="col">Payment</th>
          <th scope="col">Payment Method</th>
          <th scope="col">Ordered On</th>
          <th scope="col">Order Status</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <b>{product.title}</b>
          </td>

          <td> {product.name.toUpperCase()}</td>
          <td> {product.paymentIntent.status.toUpperCase()}</td>
          <td>{product.paymentIntent.payment_method_types}</td>
          <td>{new Date(product.paymentIntent.created).toLocaleString()}</td>
          <td>{product.orderStatus}</td>
          <td>${product.price}</td>
        </tr>
      </tbody>
      {/* <br />
      <div className="row">
        <div className="col-md-4">Total Amount</div>
        <div className="col-md-8">
          <td style={{ border: "solid 2px black" }}>
            {" "}
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </td>
        </div>
      </div> */}

      <br />
      <div className="row">
        <div className="col-md-4">Delivery Address</div>
        <div className="col-md-8">
          <td style={{ border: "solid 2px Black", borderRadius: "30px" }}>
            {product.address}
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
