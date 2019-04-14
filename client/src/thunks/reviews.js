import axios from "axios";
import { config, url } from "../server";
import { addReviews, fetchReviews } from "../actions/reviews";

export const getReviews = id => async (dispatch, getState) => {
  dispatch(fetchReviews());
  const { data } = await axios.get(
    `${url}/review/${id}`,
    config(getState().token)
  );
  dispatch(addReviews(data));
};

export const addReview = data => async (dispatch, getState) => {
  await axios.post(`${url}/review`, data, config(getState().token));
  dispatch(getReviews(data.game_id));
};

export const deleteReview = data => async (dispatch, getState) => {
  await axios({
    method: "delete",
    url: `${url}/review`,
    data,
    ...config(getState().token)
  });
  dispatch(getReviews(data.game_id));
};
