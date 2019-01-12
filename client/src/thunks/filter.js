import {setMaxPrice, setMinPrice, setSort} from "../actions/filter";
import {resetPage} from "../actions/pagination";

export const changeMinPrice = price => dispatch => {
  dispatch(setMinPrice(price));
  dispatch(resetPage());
};

export const changeMaxPrice = price => dispatch => {
  dispatch(setMaxPrice(price));
  dispatch(resetPage());
};

export const changeSort = sort => dispatch => {
  dispatch(setSort(sort));
  dispatch(resetPage());
};