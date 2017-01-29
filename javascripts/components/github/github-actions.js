import constants from './github-constants';

function onSetMetadata(metadata) {
    return {
        type: constants.SET_METADATA,
        metadata
    };
}

function onFetchRepos(owners) {
    return {
        type: constants.FETCH_REPOS,
        owners
    };
}

function onFetchUsers(owners) {
    return {
        type: constants.FETCH_USERS,
        owners
    };
}

function onSetRepos(repos) {
    return {
        type: constants.SET_REPOS,
        repos
    };
}

function onSetUsers(users) {
    return {
        type: constants.SET_USERS,
        users
    };
}

function onSetAuthStatus(status) {
    return {
        type: constants.SET_AUTH_STATUS,
        status
    };
}

function onSetUsersStatus(status) {
    return {
        type: constants.SET_USERS_STATUS,
        status
    };
}

function onSetReposStatus(status) {
    return {
        type: constants.SET_REPOS_STATUS,
        status
    };
}

function onAuthenticate(user, owners = []) {
    return {
        type: constants.AUTH_USER,
        user,
        owners
    };
}

export default {
    onSetMetadata,
    onFetchRepos,
    onFetchUsers,
    onSetRepos,
    onSetUsers,
    onSetAuthStatus,
    onSetUsersStatus,
    onSetReposStatus,
    onAuthenticate
};
