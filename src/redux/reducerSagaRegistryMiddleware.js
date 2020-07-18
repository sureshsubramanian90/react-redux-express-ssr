import ReducersSagaRegistryTypes from '../actionTypes/ReducerSagaRegistryActionTypes';
import ReducerSagaRegistry from './ReducerSagaRegistry';

const DEFAULT_ACTION = 'DEFAULT';

const reducerRegistryMiddleware = store => next => (action) => { // eslint-disable-line
    const { type, payload } = action;

    const actions = {
        [ReducersSagaRegistryTypes.INJECT_REDUCER]: () => ReducerSagaRegistry.injectReducer(payload),
        [ReducersSagaRegistryTypes.REJECT_REDUCER]: () => ReducerSagaRegistry.rejectReducer(payload),
        [ReducersSagaRegistryTypes.INJECT_SAGA]: () => ReducerSagaRegistry.injectSaga(payload),
        [ReducersSagaRegistryTypes.REJECT_SAGA]: () => ReducerSagaRegistry.rejectSaga(payload),
        [DEFAULT_ACTION]: () => next(action),
    };

    return (actions[type] || actions[DEFAULT_ACTION])();
};

export default reducerRegistryMiddleware;
