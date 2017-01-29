import constants from './github-constants';
import {
    RemoteDataWorkflow,
    isValidStatus
} from './github-utils';
import createReducers from '../util/reducers';

const mapping = {
    [constants.SET_METADATA]: (state, { metadata }) => {
        if (Object.keys(metadata).length) {
            return {
                metadata
            };
        }
        return {};
    },
    [constants.SET_REPOS]: (state, { repos }) => {
        if (repos.length) {
            return {
                repos
            };
        }
        return {};
    },
    [constants.SET_USERS]: (state, { users }) => {
        if (users.length) {
            return {
                users
            };
        }
        return {};
    },
    [constants.SET_AUTH_STATUS]: ({ authStatus }, { status }) => {
        if (isValidStatus(authStatus, status)) {
            return {
                authStatus: status
            };
        }
        return {};
    },
    [constants.SET_REPOS_STATUS]: ({ reposStatus }, { status }) => {
        if (isValidStatus(reposStatus, status)) {
            return {
                reposStatus: status
            };
        }
        return {};
    },
    [constants.SET_USERS_STATUS]: ({ usersStatus }, { status }) => {
        if (isValidStatus(usersStatus, status)) {
            return {
                usersStatus: status
            };
        }
        return {};
    }
};
// "token": "abcdefgh12345678",
// "token_last_eight": "12345678",
// "hashed_token": "25f94a2a5c7fbaf499c665bc73d67c1c87e496da8985131633ee0a95819db2e8",
const ACCESS_TOKEN = [
    '78c1c41495',
    'aa3426f1d0',
    'a96e671868',
    'ce0b4802ad'
];

const initialState = {
    repos: [],
    users: [],
    reposStatus: RemoteDataWorkflow.NotLoaded,
    usersStatus: RemoteDataWorkflow.NotLoaded,
    metadata: {
        token: ACCESS_TOKEN.join(''),
        headers: {
            Authorization: `token ${ACCESS_TOKEN.join('')}`
        },
        urlMappingEndpoint: {
            'github/repos/get': 'https://api.github.com/users/:owner/repos',
            'github/repos/owner/repo/readme/get': 'https://api.github.com/repos/:owner/:repo/readme',
            // 'github/user/auth': 'https://:owner::token@api.github.com/user',
            'github/user/auth': 'https://api.github.com/authorizations/clients/:client_id',
            // 'github/user/auth': 'https://api.github.com/authorizations',
            'github/user/get': 'https://api.github.com/users/:owner'
        }
    }
};

export default createReducers(initialState, mapping);
