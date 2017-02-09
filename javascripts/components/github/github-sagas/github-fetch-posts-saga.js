import { select, put, call, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import constants from '../github-constants';
import actions from '../github-actions';
import GithubPostApi from '../github-post-api';
import {
  RemoteDataWorkflow,
  parsePostData
} from '../github-utils';
import SagasUtils from '../../util/sagas';

const MAX_ATTEMPTS = 5;

function factoryFetchPostsSaga(storeSection) {
  const getState = SagasUtils.getter(storeSection);

  function* onFetchPosts(action) {
    const {
      attempt
    } = action;
    const state = yield select(getState);
    const { metadata } = state;
    const api = new GithubPostApi(metadata);
    const response = yield call(api.getAll);
    if (response.error) {
      yield put(actions.onSetPostsStatus(RemoteDataWorkflow.LoadingError));
      // attempt could be undefined
      if (!(MAX_ATTEMPTS < attempt)) {
        yield call(delay, 1000);
        yield call(onFetchPosts, { attempt: (attempt || 0) + 1 });
      }
    } else {
      const posts = parsePostData(response.data);
      yield put(actions.onSetPosts(posts));
      yield put(actions.onSetPostsStatus(RemoteDataWorkflow.Loaded));
      yield put(actions.onFetchContents(1));
    }
  }

  function* watchFetchPosts() {
    yield takeEvery(constants.FETCH_POSTS, onFetchPosts);
  }

  return {
    watcher: watchFetchPosts,
    handler: onFetchPosts
  };
}

export default factoryFetchPostsSaga;
