import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DollarOutlined } from "@ant-design/icons";
import { productBidding, getProduct } from "../../functions/product.functions";

const BiddingModal = ({ product }) => {
  const { slug } = useParams();
  const { title, price, _id } = product;
  const [show, setShow] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const [bidProduct, setBidProduct] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bidPrice, setBidPrice] = useState(price);

  const showModal = () => {
    if (user && user.token) {
      handleShow(true);
    }
  };
  useEffect(() => {
    loadSingleProduct();
  }, []);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setBidProduct(res.data);
      // console.log(product.price);
    });
  };

  const handleChange = (e) => {
    setBidPrice(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (bidPrice <= price) {
      toast.error("Bid Should be larger than current price");
      return;
    }
    productBidding(product._id, bidPrice, user.token).then((res) => {
      handleClose();

      toast.success("Thank you for participation");
      // console.log(JSON.stringify(res.data));
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  };
  return (
    <>
      <div onClick={showModal}>
        <DollarOutlined className="text-success" /> <br />
        {user ? "Place Your Bid" : <Link to="/login"> Login to Place Bid</Link>}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Place Your Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-group ">
            <input
              type="number"
              name={product._id}
              className="form-control"
              value={bidPrice}
              placeholder="Place your bid here"
              onChange={handleChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            type="submit"
            onClick={handleClick}
            onSubmit={handleClick}
          >
            Place Bid
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BiddingModal;
