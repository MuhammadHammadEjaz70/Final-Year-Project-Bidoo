import React from "react";
import UserNavigation from "../../components/nav/UserNavigation";

const WishList = () => {
  return (
    <>
      <div className="contianer-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNavigation />
          </div>
          <div className="col">User WishList Page</div>
        </div>
      </div>
    </>
  );
};

export default WishList;
