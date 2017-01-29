import factoryGithubAuthenticationSaga from './github-authentication-saga';
import factoryGithubFetchReposSaga from './github-fetch-repos-saga';
// import factoryGithubFetchRepoReadmeSaga from './github-fetch-repo-readme-saga';
import factoryGithubFetchUsersSaga from './github-fetch-users-saga';

export default storeSection => [
    factoryGithubAuthenticationSaga(storeSection).watcher,
    factoryGithubFetchReposSaga(storeSection).watcher,
    // factoryGithubFetchRepoReadmeSaga(storeSection).watcher,
    factoryGithubFetchUsersSaga(storeSection).watcher
];
