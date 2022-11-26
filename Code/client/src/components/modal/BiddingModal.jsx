import React, { useState } from "react";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DollarOutlined } from "@ant-design/icons";

const BiddingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    if (user && user.token) {
      setIsModalOpen(true);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
    toast.success("Thanks for your Feedback");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={showModal}>
        <DollarOutlined className="text-success" /> <br />
        {user ? "Place Your Bid" : <Link to="/login"> Login to Place Bid</Link>}
      </div>

      <Modal
        title="Place Bid"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default BiddingModal;
