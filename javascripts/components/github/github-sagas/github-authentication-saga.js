import { select, put, call, takeLatest } from 'redux-saga/effects';
import constants from '../github-constants';
import actions from '../github-actions';
import GithubUserApi from '../github-user-api';
import { RemoteDataWorkflow } from '../github-utils';
import SagasUtils from '../../util/sagas';

function factoryAuthenticationSaga(storeSection) {
    const getState = SagasUtils.getter(storeSection);

    function* onAuthenticate(action) {
        const {
            // user,
            owners
        } = action;
        const state = yield select(getState);
        const { metadata } = state;
        const api = new GithubUserApi(metadata);
        const {
            error
        } = yield call(api.auth, {});
        if (error) {
            yield put(actions.onSetAuthStatus(RemoteDataWorkflow.LoadingError));
        } else {
            yield put(actions.onSetAuthStatus(RemoteDataWorkflow.Loaded));
            // Both tasks run asynchronuosly
            yield put(actions.onFetchUsers(owners));
            yield put(actions.onFetchRepos(owners));
        }
    }

    function* watchAuthenticate() {
        yield takeLatest(constants.AUTH_USER, onAuthenticate);
    }

    return {
        watcher: watchAuthenticate,
        handler: onAuthenticate
    };
}

export default factoryAuthenticationSaga;
