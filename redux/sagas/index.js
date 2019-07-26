import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../auth';

/* ------------- Sagas ------------- */
import { signIn, signOut, getMe } from './auth';


/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(AuthTypes.SIGN_IN, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
    takeLatest(AuthTypes.GET_ME, getMe)
  ]);
}
