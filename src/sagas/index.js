import { all, fork } from "redux-saga/effects";
import watchHomeRequest from "./HomeSaga";

export default function* rootSaga() {
  yield all([fork(watchHomeRequest)]);
}
