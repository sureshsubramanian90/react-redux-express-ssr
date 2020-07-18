import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import reducerFactory, { bootReducers } from './reducerFactory';
import reducerRegistryMiddleware from './reducerSagaRegistryMiddleware';
import reducerSagaRegistry from './ReducerSagaRegistry';

let store = {};
let sagaMiddleware;
const storeFactory = (reducers, initialState, rootSaga, externalMiddlewares) => {
    sagaMiddleware = createSagaMiddleware();
    let middleware = [sagaMiddleware, reducerRegistryMiddleware];
    if (externalMiddlewares) {
        middleware = [...middleware, ...externalMiddlewares];
    }

    store = createStore(
        reducerFactory(reducers),
        initialState,
        compose(applyMiddleware(...middleware)),
    );

    store.initialReducers = reducers;
    store.tasks = rootSaga ? [sagaMiddleware.run(rootSaga)] : [];

    reducerSagaRegistry.reset();

    reducerSagaRegistry.initReducers({
        ...bootReducers,
        ...store.initialReducers,
    }, asyncReducers => store.replaceReducer(combineReducers(asyncReducers)));

    reducerSagaRegistry.initSagas(
        rootSaga.injectedSagas,
        (asyncSaga) => {
            let task = null;
            if (asyncSaga) {
                task = sagaMiddleware.run(asyncSaga);
                store.tasks = [...store.tasks, task];
            }
            return task;
        },
        sagaTask => sagaTask && sagaTask.cancel(),
    );
    return store;
};

export const getStore = () => store;
export const getSagaMiddleWare = () => sagaMiddleware;

export default storeFactory;

