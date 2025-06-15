import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex justify-center">
      <input
        type="search"
        className="w-[600px] pl-10 pr-4 py-2 rounded-lg border border-gray-300  focus:outline-none "
        placeholder="Search for an idea..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
