import { resetErrorMessage, resetSuccessMessage } from "../actions/auth";

export const resetMessages = () => dispatch => {
  dispatch(resetSuccessMessage());
  dispatch(resetErrorMessage());
};
