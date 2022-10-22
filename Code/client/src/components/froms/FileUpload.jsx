import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = async (e) => {
    // console.log(e.target.files);
    //resize image
    try {
      const files = e.target.files;
      console.log("files====>", files);
      if (files) {
        for (let i = 0; i < files.length; i++) {
          Resizer.imageFileResizer(
            files[i],
            720,
            720,
            "JPEG",
            100,
            0,
            (uri) => {
              console.log(uri);
            },
            "base64"
          );
        
        }
      }
    } catch (error) {
      console.log(error);
    }
    //send  to server to upload
    //server upload to CLOUDINARY
    //cloudinary send image back to server
    //server store that url in database
    //Send that url as a response to front end as store to images[] in the parent component ---> CreateProduct
  };

  return (
    <div className="row ">
      <label className="btn btn-dark  btn-raised">
        Choose File
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        ></input>
      </label>
    </div>
  );
};

export default FileUpload;
