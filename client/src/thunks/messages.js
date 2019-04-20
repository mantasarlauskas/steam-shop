import { resetErrorMessage, resetSuccessMessage } from "../actions/messages";

export const resetMessages = () => dispatch => {
  dispatch(resetSuccessMessage());
  dispatch(resetErrorMessage());
};
