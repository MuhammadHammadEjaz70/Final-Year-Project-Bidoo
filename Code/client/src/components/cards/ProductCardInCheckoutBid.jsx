import React from "react";
import ModalImage from "react-modal-image";
import logo from "../../images/logo.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CloseOutlined } from "@ant-design/icons";

const ProductCardInCheckoutBid = ({ p }) => {
  let dispatch = useDispatch();

  return (
    <tbody>
      <tr>
        <td style={{ width: "130px" }}>
          <div
            style={{
              width: "130px",
              height: "auto",
            }}
          >
            {p.product.images.length ? (
              <ModalImage small={p.product.images[0].url} large={p.product.images[0].url} />
            ) : (
              <ModalImage small={logo} large={logo} />
            )}
          </div>
        </td>
        <td>{p.product.title}</td>
        <td>${p.product.price}</td>
      </tr>
    </tbody>    
  );
};

export default ProductCardInCheckoutBid;
