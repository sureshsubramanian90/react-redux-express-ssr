import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import contextReducer from './reducers/ContextReducer';
import rootReducer from './reducers';
import rootSagas from './sagas';
import { getApplicationContext } from "./ContextLoader";

const initialState = window.__PRELOADED_STATE__;
const context = { context: getApplicationContext() };
const bootReducers = {
    context: contextReducer,
    ...rootReducer
};
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers(bootReducers),
    initialState,
    applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);
console.log('window.__PRELOADED_STATE__', window.__PRELOADED_STATE__)
export default store;
