import { put, call, takeLatest } from 'redux-saga/effects';
import {
  GET_HOME_PAGE_DATA_REQUEST_SUCCESS,
  GET_HOME_PAGE_DATA_REQUEST,
  GET_HOME_PAGE_DATA_REQUEST_ERROR
} from '../actionTypes/HomeActionTypes';

function* homeSaga(action) {
  try {
    const params = action.payload;
    yield put({ type: GET_HOME_PAGE_DATA_REQUEST_SUCCESS });
  } catch (err) {
    yield put({ type: GET_HOME_PAGE_DATA_REQUEST_ERROR });
  }
}

export default function* watchHomeRequest() {
  yield takeLatest(GET_HOME_PAGE_DATA_REQUEST, homeSaga);
}
