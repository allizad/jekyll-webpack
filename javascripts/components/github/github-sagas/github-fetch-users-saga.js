import { select, put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import constants from '../github-constants';
import actions from '../github-actions';
import GithubUserApi from '../github-user-api';
import {
    RemoteDataWorkflow,
    parseUserData
} from '../github-utils';
import SagasUtils from '../../util/sagas';

const MAX_ATTEMPTS = 5;

function factoryFetchUsersSaga(storeSection) {
    const getState = SagasUtils.getter(storeSection);

    function* onFetchUsers(action) {
        const {
            owners,
            attempt
        } = action;
        const state = yield select(getState);
        const { metadata } = state;
        const api = new GithubUserApi(metadata);
        const apiResponse = yield owners.map(owner => call(api.get, { owner }));
        const hasError = Boolean(apiResponse.filter(response => response.error).length);
        if (hasError) {
            yield put(actions.onSetUsersStatus(RemoteDataWorkflow.LoadingError));
            // attempt could be undefined
            if (!(MAX_ATTEMPTS < attempt)) {
                yield call(delay, 1000);
                yield call(onFetchUsers, { owners, attempt: (attempt || 0) + 1 });
            }
        } else {
            const users = apiResponse.map(response => parseUserData(response.data));
            yield put(actions.onSetUsersStatus(RemoteDataWorkflow.Loaded));
            yield put(actions.onSetUsers(users));
        }
    }

    function* watchFetchUsers() {
        yield takeLatest(constants.FETCH_USERS, onFetchUsers);
    }

    return {
        watcher: watchFetchUsers,
        handler: onFetchUsers
    };
}

export default factoryFetchUsersSaga;
