import { SIGN_IN, SIGN_OUT } from '../actions/actionTypes';

const INITIAL_STATE = { signedIn: null, userId: null };

export default (initialState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...initialState, signedIn: true, userId: action.payload.userId };
    case SIGN_OUT:
      return { ...initialState, signedIn: false, userId: null };
    default:
      return initialState;
  }
};
