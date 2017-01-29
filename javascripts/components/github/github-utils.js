import Immutable from '../util/immutable';

const RemoteDataWorkflow = Immutable({
    NotLoaded: 'NotLoaded',
    Loading: 'Loading',
    LoadingError: 'LoadingError',
    Loaded: 'Loaded'
});

const StatusMachineState = Immutable({
    [RemoteDataWorkflow.NotLoaded]: (status =>
        [RemoteDataWorkflow.Loading].indexOf(status) > -1),
    [RemoteDataWorkflow.Loading]: (status =>
        [RemoteDataWorkflow.LoadingError, RemoteDataWorkflow.Loaded].indexOf(status) > -1),
    [RemoteDataWorkflow.LoadingError]: (status =>
        [RemoteDataWorkflow.Loading, RemoteDataWorkflow.NotLoaded].indexOf(status) > -1),
    [RemoteDataWorkflow.Loaded]: (status =>
        [].indexOf(status) > -1)
});

function isValidStatus(status, nextStatus) {
    return (StatusMachineState[status] || (() => false))(nextStatus);
}

function parseRepoData(repo) {
    return {
        id: repo.id,
        name: repo.name,
        owner: {
            username: repo.owner.login,
            avatar: repo.owner.avatar_url
        },
        git: repo.git_url,
        ssh: repo.ssh_url,
        language: repo.language,
        size: repo.size,
        fork: repo.fork,
        stars: repo.stargazers_count,
        watchers: repo.watchers_count
    };
}

function parseUserData(user) {
    return {
        id: user.id,
        username: user.login,
        avatar: user.avatar_url,
        name: user.name,
        email: user.email,
        location: user.location,
        blog: user.blog,
        bio: user.bio
    };
}

export { RemoteDataWorkflow };
export { isValidStatus };
export { parseRepoData };
export { parseUserData };

export default {
    RemoteDataWorkflow,
    isValidStatus,
    parseRepoData,
    parseUserData
};
