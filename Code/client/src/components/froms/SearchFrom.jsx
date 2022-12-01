import React from "react";

const SearchFrom = ({ search, setSearch }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      placeholder="Filter"
      value={search}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};

export default SearchFrom;
