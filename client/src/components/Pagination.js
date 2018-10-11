import React from 'react';
import ReactPaginate from 'react-paginate';

export default ({ pageCount, changePage }) => (
  <ReactPaginate
    onPageChange={changePage}
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
  />
);