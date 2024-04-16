/* eslint-disable react/prop-types */
import React from 'react';
import Card from "./Card";
import { usePagination } from "./CardsPagination";

export default function Cards({dogs}) {
  const { currentPage, currentItems, nextPage, prevPage, totalPages } =
  usePagination(dogs, 8);

  return (
    <div>
      <div className="CountryCardsControls">
        <button className="CountryCardsButton" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="CountryCardsSpan">Page {currentPage} of {totalPages}</span>
        <button className="CountryCardsButton" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

    <div className="CountriesCardsContainer">
      {currentItems.map((dog) => (
        <Card key={dog.id} dog={dog} />
      ))}
    </div>

      <div className="CountryCardsControls">
        <button className="CountryCardsButton" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="CountryCardsSpan">Page {currentPage} of {totalPages}</span>
        <button className="CountryCardsButton" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};