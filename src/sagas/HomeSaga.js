import { put, call, takeLatest } from 'redux-saga/effects';
import { getData } from '../interfaces/Home/HomeApi';
import {
  GET_HOME_PAGE_DATA_REQUEST_SUCCESS,
  GET_HOME_PAGE_DATA_REQUEST,
  GET_HOME_PAGE_DATA_REQUEST_ERROR
} from '../actionTypes/HomeActionTypes';

function* homeSaga(action) {
  try {
    console.log('API TRIGGERED');
    const params = action.payload;
    const result = yield call(getData, params);
    if (result.isSuccess) {
      console.log('API RESULT')
      const data = result.data;
      yield put({ type: GET_HOME_PAGE_DATA_REQUEST_SUCCESS, data });
    } else {
      yield put({ type: GET_HOME_PAGE_DATA_REQUEST_ERROR });
    }
  } catch (err) {
    yield put({ type: GET_HOME_PAGE_DATA_REQUEST_ERROR });
  }
}

export default function* watchHomeRequest() {
  yield takeLatest(GET_HOME_PAGE_DATA_REQUEST, homeSaga);
}
