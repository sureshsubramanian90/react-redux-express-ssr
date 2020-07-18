import { combineReducers } from 'redux';
import contextReducer from '../reducers/ContextReducer';

export const bootReducers = {
    context: contextReducer,
};

const reducerFactory = (initialReducers, asyncReducers = {}) => combineReducers({
    ...bootReducers,
    ...initialReducers,
    ...asyncReducers,
});

export default reducerFactory;
