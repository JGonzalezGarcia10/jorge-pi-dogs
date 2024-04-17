/* eslint-disable react/prop-types */
import React from 'react';
import Card from "./Card";
import { usePagination } from "./CardsPagination";
import './CSScomponents/Cards.css';

export default function Cards({dogs}) {
  const { currentPage, currentItems, nextPage, prevPage, totalPages } =
  usePagination(dogs, 8);

  return (
    <div>
      <div className="DogCardsControls">
        <button className="DogCardsButton" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="DogCardsSpan">Page {currentPage} of {totalPages}</span>
        <button className="DogCardsButton" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

    <div className="DogCardsContainer">
      {currentItems.map((dog) => (
        <Card key={dog.id} dog={dog} />
      ))}
    </div>
    </div>
  );
};