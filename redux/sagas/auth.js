import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import { login, getMe as getMeApi, getActiveStatement, getBoard } from '../../service/api';
import LocalStorage from '../../utils/localStorage';
import {
  AuthActions
} from '../';

export function* signIn({ email, password }) {
  try {
    const ret = yield call(login, email, password);
    if (ret && ret.auth) {
      yield call(getMe, { token: ret.token });
      yield put(AuthActions.signInSuccess(ret.token));
    } else {
      yield put(AuthActions.requestAuthFailed(get(ret, 'error.message', 'Wrong Login information')));
    }
  } catch (err) {
    yield put(AuthActions.requestAuthFailed('Network Connection Lost!'));
  }
}

export function* getMe({ token, directCall }) {
  try {
    const ret = yield call(getMeApi, token);
    yield call(getHomeInfo);
    if (directCall) {
      yield put(AuthActions.signInSuccess(token));
    }
  } catch (err) {
    yield put(AuthActions.requestAuthFailed('Network Connection Lost!'));
  }
}

export function* signOut() {
  try {
    LocalStorage.clearStorage();
  } catch (e) {
    yield put(AuthActions.requestAuthFailed('Sign Out Failed'));
  }
}
