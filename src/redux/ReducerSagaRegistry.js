import _omit from 'lodash/omit';
import _get from 'lodash/get';
import _size from 'lodash/size';
import _without from 'lodash/without';

class ReducerSagaRegistry {
    constructor() {
        this.subscribers = {};
        this.reducers = {};
        this.sagas = {};
        this.updateStore = null;
        this.runSaga = null;
        this.cancelSaga = null;
    }

    reset = () => {
        this.subscribers = {};
    };

    initReducers = (initialReducers, injectHandler) => {
        this.reducers = { ...initialReducers };
        this.updateStore = injectHandler;
    };

    injectReducer = ({ name, reducer, requestedBy }) => {
        this.subscribers[name] = [..._get(this.subscribers, name, []), requestedBy];

        if (!this.reducers[name] && this.updateStore) {
            this.reducers = { ...this.reducers, [name]: reducer };
            this.updateStore(this.getReducers());
        }
    };

    rejectReducer = ({ name, requestedBy }) => {
        this.subscribers[name] = _without(_get(this.subscribers, name, []), requestedBy);

        if (!_size(this.subscribers[name]) && this.updateStore) {
            this.reducers = _omit(this.reducers, name);
            this.updateStore(this.getReducers());
        }
    };

    getReducers() {
        return { ...this.reducers };
    }

    initSagas = (rootSagas, injectHandler, rejectHandler) => {
        this.sagas = { ...rootSagas };
        this.runSaga = injectHandler;
        this.cancelSaga = rejectHandler;
    };

    injectSaga = ({ name, saga, requestedBy }) => {
        this.subscribers[name] = [..._get(this.subscribers, name, []), requestedBy];

        if (!this.sagas[name] && this.runSaga) {
            const injected = this.runSaga(saga);
            this.sagas = { ...this.reducers, [name]: injected };
        }
    };

    rejectSaga = ({ name, requestedBy }) => {
        this.subscribers[name] = _without(_get(this.subscribers, name, []), requestedBy);

        if (!_size(this.subscribers[name]) && this.sagas[name] && this.cancelSaga) {
            this.cancelSaga(this.sagas[name]);
            this.sagas = _omit(this.sagas, name);
        }
    };
}

const reducerSagaRegistry = new ReducerSagaRegistry();

export default reducerSagaRegistry;
