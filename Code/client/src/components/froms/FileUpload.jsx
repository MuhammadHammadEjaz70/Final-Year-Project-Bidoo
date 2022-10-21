import React from "react";

const FileUpload = () => {
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    //resize
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
