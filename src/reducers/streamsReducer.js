import _ from 'lodash';
import {
  FETCH_STREAMS,
  CREATE_STREAM,
  FETCH_STREAM,
  UPDATE_STREAM,
  DELETE_STREAM,
} from '../actions/actionTypes';

const INITIAL_STATE = {};

export default (initialState = INITIAL_STATE, action) => {
  const payload = action.payload;
  switch (action.type) {
    case FETCH_STREAMS:
      return { ...initialState, ..._.mapKeys(payload, 'id') };
    case FETCH_STREAM:
      return { ...initialState, [payload.id]: payload };
    case CREATE_STREAM || FETCH_STREAM || UPDATE_STREAM:
      return { ...initialState, [payload.id]: payload };
    case DELETE_STREAM:
      return _.omit(initialState, payload);
    default:
      return initialState;
  }
};
