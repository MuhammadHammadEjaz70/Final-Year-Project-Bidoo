import React, { useState, useEffect } from "react";
import { Card } from "antd";
import logo from "../../images/logo.png";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { p_status } from "../../functions/product.functions";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const { title, description, images, slug, productStatus } = product;
  const [status, setStatus] = useState(productStatus);

  const { user } = useSelector((state) => ({ ...state }));

  // useEffect(() => {
  //   product;
  // }, [productStatus]);
  const changeProductStatus = () => {
    console.log(productStatus);

    if (productStatus === "enable") {
      const status = "disable";
      setStatus(status);
      // console.log("product status ---->", status);
      p_status(slug, status, user.token)
        .then((res) => {
          toast.error("Product is Disabled");
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    } else if (productStatus === "disable") {
      const status = "enable";
      setStatus(status);
      p_status(slug, status, user.token)
        .then((res) => {
          toast.success("Product is Enabled");
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
      // console.log("product status ---->", status);
    }
  };

  const handleChange = () => {
    changeProductStatus();
  };

  return (
    <Card
      hoverable
      cover={
        <>
          <img
            src={images && images.length ? images[0].url : logo}
            className="p-1"
            style={{ height: "200px", objectFit: "cover", width: 240 }}
          />
          <div className="h5 m-3"> Product Status : {productStatus}d</div>
        </>
      }
      actions={[
        <div>
          <button
            className="btn btn-dark m-4"
            onClick={handleChange}
            value="enable"
            disabled={productStatus === "enable"}
          >
            Enable
          </button>
          <button
            className="btn btn-danger m-4"
            onClick={handleChange}
            value="disable"
            disabled={productStatus === "disable"}
          >
            Disable
          </button>
        </div>,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
