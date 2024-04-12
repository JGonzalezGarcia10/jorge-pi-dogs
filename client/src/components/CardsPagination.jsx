import { useEffect, useState } from "react";

export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = [];
    if (Array.isArray(data)) {
      currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    }
    setCurrentPageData(currentItems);
  }, [data, currentPage, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    currentItems: currentPageData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
    totalPages: Math.ceil(data.length / itemsPerPage),
  };
};
