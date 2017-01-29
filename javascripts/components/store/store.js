import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import initSagas from './sagas';
import reducers from './reducers';
import Immutable from '../util/immutable';

let lastStore;

function create() {
    const sagaMiddleware = createSagaMiddleware();
    lastStore = createStore(
        combineReducers(reducers),
        applyMiddleware(sagaMiddleware)
    );
    initSagas(sagaMiddleware);

    return lastStore;
}

function getLastStore() {
    return lastStore;
}

const StoreFactory = Immutable({
    create,
    getLastStore
});

export { StoreFactory };
export default create();
