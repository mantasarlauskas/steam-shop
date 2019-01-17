import React from 'react';
import ReactPaginate from 'react-paginate';

export default ({pageCount, changePage, page}) => (
  <ReactPaginate
    onPageChange={changePage}
    forcePage={page}
    pageCount={pageCount}
    marginPagesDisplayed={5}
    pageRangeDisplayed={5}
    containerClassName="pagination"
    pageClassName="page-item"
    previousClassName="page-item"
    nextClassName="page-item"
    pageLinkClassName="page-link"
    nextLinkClassName="page-link"
    previousLinkClassName="page-link"
    activeClassName="active"
    nextLabel="Pirmyn"
    previousLabel="Atgal"
  />
);