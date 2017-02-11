import factoryGithubAuthenticationSaga from './github-authentication-saga';
import factoryGithubFetchReposSaga from './github-fetch-repos-saga';
// import factoryGithubFetchRepoReadmeSaga from './github-fetch-repo-readme-saga';
import factoryGithubFetchUsersSaga from './github-fetch-users-saga';
import factoryFetchPostsSaga from './github-fetch-posts-saga';
import factoryFetchContentsSaga from './github-fetch-contents-saga';

export default storeSection => [
  factoryGithubAuthenticationSaga(storeSection).watcher,
  factoryGithubFetchReposSaga(storeSection).watcher,
  // factoryGithubFetchRepoReadmeSaga(storeSection).watcher,
  factoryGithubFetchUsersSaga(storeSection).watcher,
  factoryFetchPostsSaga(storeSection).watcher,
  factoryFetchContentsSaga(storeSection).watcher
];
