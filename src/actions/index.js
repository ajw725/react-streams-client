import history from '../history';
import streamsClient from '../apis/streams';
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_STREAMS,
  CREATE_STREAM,
  FETCH_STREAM,
  UPDATE_STREAM,
  DELETE_STREAM,
} from './actionTypes';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: { userId },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const fetchStreams = () => async (dispatch) => {
  console.log('fetching streams');
  const resp = await streamsClient.get('/streams');
  dispatch({
    type: FETCH_STREAMS,
    payload: resp.data,
  });
};

export const createStream = (formData) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const resp = await streamsClient.post('/streams', { ...formData, userId });
  dispatch({
    type: CREATE_STREAM,
    payload: resp.data,
  });
  history.push('/');
};

export const fetchStream = (streamId) => async (dispatch) => {
  console.log('fetching stream', streamId);
  const resp = await streamsClient.get(`/streams/${streamId}`);
  dispatch({
    type: FETCH_STREAM,
    payload: resp.data,
  });
};

export const updateStream = (streamId, formData) => async (dispatch) => {
  const resp = await streamsClient.patch(`/streams/${streamId}`, formData);
  dispatch({
    type: UPDATE_STREAM,
    payload: resp.data,
  });
  history.push('/');
};

export const deleteStream = (streamId) => async (dispatch) => {
  await streamsClient.delete(`/streams/${streamId}`);
  dispatch({
    type: DELETE_STREAM,
    payload: streamId,
  });
};
