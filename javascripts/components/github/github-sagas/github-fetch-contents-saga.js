import { select, put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import constants from '../github-constants';
import actions from '../github-actions';
import GithubPostApi from '../github-post-api';
import {
  RemoteDataWorkflow,
  getPageLimits
} from '../github-utils';
import SagasUtils from '../../util/sagas';

const MAX_ATTEMPTS = 5;

function factoryFetchContentsSaga(storeSection) {
  const getState = SagasUtils.getter(storeSection);

  function* onFetchContents(action) {
    yield put(actions.onSetContentsStatus(RemoteDataWorkflow.Loading));
    const {
      page,
      attempt
    } = action;
    const state = yield select(getState);
    const {
      metadata,
      posts,
      postsPerPage,
      totalPosts
    } = state;
    const { start, end } = getPageLimits({ postsPerPage, currentPage: page, totalPosts });
    const pagePosts = posts.slice(start, end);
    const api = new GithubPostApi(metadata);
    const apiResponses = yield pagePosts.map((post) => {
      if (post.markdownContent) {
        return Promise.resolve({
          data: post.markdownContent,
          isCache: true
        });
      }
      return call(api.get, post.download);
    });
    const hasError = Boolean(apiResponses.filter(response => response.error).length);
    if (hasError) {
      yield put(actions.onSetContentsStatus(RemoteDataWorkflow.LoadingError));
      // attempt could be undefined
      if (!(MAX_ATTEMPTS < attempt)) {
        yield call(delay, 1000);
        yield call(onFetchContents, { page, attempt: (attempt || 0) + 1 });
      }
    } else {
      const contents = apiResponses.map(({ data, isCache }, idx) => ({
        id: pagePosts[idx].id,
        markdownContent: data,
        isCache: Boolean(isCache)
      }));
      yield put(actions.onSetContents(contents));
      yield put(actions.onSetPage(page));
      yield put(actions.onSetContentsStatus(RemoteDataWorkflow.Loaded));
    }
  }

  function* watchFetchContents() {
    yield takeLatest(constants.FETCH_CONTENTS, onFetchContents);
  }

  return {
    watcher: watchFetchContents,
    handler: onFetchContents
  };
}

export default factoryFetchContentsSaga;
