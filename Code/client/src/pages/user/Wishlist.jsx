import React, { useState, useEffect } from "react";
import UserNavigation from "../../components/nav/UserNavigation";
import { getBidsList, removeBidlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const WishList = () => {
  const [bidsList, setBidsList] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadBidList();
    // console.log(user._id);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     loadBidList();
  //     console.log("Data is comming");
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const loadBidList = () =>
    getBidsList(user.token).then((res) => {
      console.log(res);
      setBidsList(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeBidlist(productId, user.token).then((res) => {
      loadBidList();
    });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNavigation />
          </div>
          <div className="col">
            <h4>Your Bids</h4>

            {bidsList.reverse().map((p) => (
              <div key={p._id} className="alert alert-secondary">
                {p.productBidStatus === "incomplete" ? (
                  <Link to={`/product/${p.slug}`}>{p.title}</Link>
                ) : (
                  <span>{p.title}</span>
                )}
                <br />
                <span dispaly="h4">
                  {" "}
                  Current Bid Price: <b>{p.price}</b>{" "}
                </span>
                <br />
                <span>
                  {" "}
                  Bid Status: <b> {p.productBidStatus}</b>{" "}
                </span>
                <br />
                <span>
                  {" "}
                  Bid Winner :
                  <b>
                    {user._id === p.bidPostedBy
                      ? " You are Winner"
                      : p.bidPostedBy}
                    {p.bidPostedBy === null ? " Buy Out" : " "}
                  </b>
                </span>
                {/* <span
                  onClick={() => handleRemove(p._id)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
