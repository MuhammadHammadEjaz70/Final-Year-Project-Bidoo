import React from "react";
import TypeWritter from "../components/cards/TypeWritter";
import NewArrivals from "../components/home/NewArrivals";
import CategoryList from "../components/category/CategoryList";
const Home = () => {
  return (
    <>
      <div className="bg-light p-5 rounded-lg m-3 text-dark h1 font-weight-bold text-center">
        <TypeWritter
          text={[
            "BIDOO Bid it Now",
            "New Arrivals",
            "Latest Products",
            "Best Seller",
          ]}
        />
      </div>

      <h3 className="text-center bg-dark text-light p-3 mt-5 mb-5 display-4 font-weight-bold">
        New Arrivals
      </h3>
      <NewArrivals />
      <h3 className="text-center bg-dark text-light p-3 mt-5 mb-5 display-4 font-weight-bold">
        Categories
      </h3>
      <CategoryList />
      <br />
      <br />
    </>
  );
};

export default Home;
