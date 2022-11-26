import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

import { useNavigate, useParams, Link } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const { slug } = useParams();

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
        <StarOutlined className="text-danger" /> <br />
        {user ? (
          "Rate the Product"
        ) : (
          <Link to="/login" state={{ from: `/product/${slug}` }}>
            Login to Give Rating
          </Link>
        )}
      </div>

      <Modal
        title="Leave your Rating"
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

export default RatingModal;
