import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import TablePagination from "@material-ui/core/TablePagination";

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { itemsPerPage } = this.props;
    this.state = {
      page: 0,
      itemsPerPage,
      paginatedData: []
    };
  }

  componentDidMount() {
    const { data } = this.props;
    data.length > 0 && this.paginateData();
  }

  componentDidUpdate({ data: prevData }) {
    const { data } = this.props;
    prevData !== data && data && this.paginateData();
  }

  paginateData = () => {
    const { data, returnData } = this.props;
    this.setState(
      ({ page, itemsPerPage }) => ({
        paginatedData: data.filter(
          (item, index) =>
            index >= page * itemsPerPage &&
            index < page * itemsPerPage + itemsPerPage
        )
      }),
      () => returnData(this.state.paginatedData)
    );
  };

  handlePageChange = ({ selected }) => {
    this.setState(
      {
        page: selected
      },
      this.paginateData
    );
  };

  handleTablePageChange = (event, page) => {
    this.setState({ page }, this.paginateData);
  };

  handleItemsPerPageChange = ({ target: { value } }) => {
    this.setState(
      {
        itemsPerPage: value
      },
      this.paginateData
    );
  };

  resetPage = () => {
    this.setState({
      page: 0
    });
  };

  render() {
    const { page, itemsPerPage } = this.state;
    const { itemLength, tablePagination } = this.props;
    return tablePagination ? (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={itemLength}
        rowsPerPage={itemsPerPage}
        page={page}
        labelRowsPerPage="Kiekis puslapyje"
        onChangePage={this.handleTablePageChange}
        onChangeRowsPerPage={this.handleItemsPerPageChange}
      />
    ) : (
      <ReactPaginate
        onPageChange={this.handlePageChange}
        forcePage={page}
        pageCount={Math.ceil(itemLength / itemsPerPage)}
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        containerClassName="pagination"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        activeLinkClassName="page-link text-light bg-dark"
        pageLinkClassName="page-link"
        nextLabel="Pirmyn"
        previousLabel="Atgal"
      />
    );
  }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  returnData: PropTypes.func.isRequired,
  tableComponent: PropTypes.bool
};

Pagination.defaultProps = {
  tableComponent: false
};

export default Pagination;
