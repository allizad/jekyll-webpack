import { select, put, call, takeLatest } from 'redux-saga/effects';
import constants from '../github-constants';
import actions from '../github-actions';
// import factoryFetchUsersSaga from './github-fetch-users-saga';
// import factoryFetchReposSaga from './github-fetch-repos-saga';
import GithubUserApi from '../github-user-api';
import { RemoteDataWorkflow } from '../github-utils';
import SagasUtils from '../../util/sagas';

function factoryAuthenticationSaga(storeSection) {
    // const { handler: onFetchUsers } = factoryFetchUsersSaga(storeSection);
    // const { handler: onFetchRepos } = factoryFetchReposSaga(storeSection);
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
            // response,
            error
        } = yield call(api.auth, {});
        if (error) {
            yield put(actions.onSetAuthStatus(RemoteDataWorkflow.LoadingError));
        } else {
            // console.log('response', response);
            // console.log('response.data', response.data);
            // yield put(actions.onSetMetadata({
            //     ...metadata,
            //     token: response.data.token,
            //     headers: {
            //         ...metadata.headers,
            //         Authorization: `token ${response.data.token}`
            //     }
            // }));
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
