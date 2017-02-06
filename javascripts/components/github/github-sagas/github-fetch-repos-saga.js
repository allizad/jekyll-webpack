import { select, put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import constants from '../github-constants';
import actions from '../github-actions';
import GithubRepoApi from '../github-repo-api';
import {
  RemoteDataWorkflow,
  parseRepoData,
  reposSortComparator
} from '../github-utils';
import SagasUtils from '../../util/sagas';

const MAX_ATTEMPTS = 5;

function factoryFetchReposSaga(storeSection) {
  const getState = SagasUtils.getter(storeSection);

  function* onFetchRepos(action) {
    const {
      owners,
      attempt
    } = action;
    const state = yield select(getState);
    const { metadata } = state;
    const api = new GithubRepoApi(metadata);
    const apiResponse = yield owners.map(owner => call(api.get, { owner }));
    const hasError = Boolean(apiResponse.filter(response => response.error).length);
    if (hasError) {
      yield put(actions.onSetReposStatus(RemoteDataWorkflow.LoadingError));
      // attempt could be undefined
      if (!(MAX_ATTEMPTS < attempt)) {
        yield call(delay, 1000);
        yield call(onFetchRepos, { owners, attempt: (attempt || 0) + 1 });
      }
    } else {
      const repos = apiResponse.map(
        response => response.data.map(repo => parseRepoData(repo))
      ).reduce((list, next) => list.concat(next), []).sort(reposSortComparator);
      yield put(actions.onSetReposStatus(RemoteDataWorkflow.Loaded));
      yield put(actions.onSetRepos(repos));
    }
  }

  function* watchFetchRepos() {
    yield takeLatest(constants.FETCH_REPOS, onFetchRepos);
  }

  return {
    watcher: watchFetchRepos,
    handler: onFetchRepos
  };
}

export default factoryFetchReposSaga;
