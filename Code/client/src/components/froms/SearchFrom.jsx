import React from "react";

export const SearchFrom = ({ search, setSearch }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <input
      placeholder="Filter Categories"
      className="form-control mb-5"
      value={search}
      onChange={handleSearchChange}
      name=""
      id=""
    />
  );
};
