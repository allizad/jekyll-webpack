import factoryGithubSagas from '../github/github-sagas';

const sagas = [].concat(factoryGithubSagas('github'));

function initSagas(sagaMiddleware) {
    sagas.forEach(saga => sagaMiddleware.run(saga));
}

export default initSagas;
