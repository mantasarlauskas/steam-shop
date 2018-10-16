import C from '../constants';
import { ajax } from '../server';

const addKeys = keys => ({
  type: C.ADD_KEYS,
  payload: keys
});

const insertKey = key => ({
    type: C.ADD_KEY,
    payload: key
});

export const addKey = key => async (dispatch, getState) => {
    await ajax('keys', 'POST', dispatch, undefined, undefined, key, getState().token);
    dispatch(insertKey(key));
}
