import React, { useEffect, useState } from "react";
import parkData from "../data/parks.json";
import "../App";

export default function SearchBar({
  searchText,
  setSearchText,
  handleSearch,
  filteredParkData,
}) {
  // useEffect(() => {
  //   const searched = parkData.filter(function (parkData) {
  //     return parkData.map_label.searchText === searchText;
  //   });
  // }, [searchText]);
  const handleSubmit = (e) => {
    console.log("Form submitted");
    e.preventDefault(); // Prevent default form submission
    handleSearch(filteredParkData); // Trigger search action with filteredParkData
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search to see park options..."
          value={searchText}
          // onChange={setSearchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
    </div>
  );
}
