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
    size: Number(repo.size),
    forks: Number(repo.forks),
    stars: Number(repo.stargazers_count),
    watchers: Number(repo.watchers_count)
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

function reposSortComparator(a, b) {
  const forks = b.forks - a.forks;
  if (forks !== 0) {
    return forks;
  }
  const stars = b.stars - a.stars;
  if (stars !== 0) {
    return stars;
  }
  const watchers = b.watchers - a.watchers;
  if (watchers !== 0) {
    return watchers;
  }
  if (a.name === b.name) {
    if (a.owner.name === b.owner.name) {
      return 0;
    }

    return (a.owner.username.toLowerCase() < b.owner.username.toLowerCase())
      ? -1
      : 1;
  }
  return (a.name.toLowerCase() < b.name.toLowerCase())
    ? -1
    : 1;
}

export { RemoteDataWorkflow };
export { isValidStatus };
export { parseRepoData };
export { parseUserData };
export { reposSortComparator };

export default {
  RemoteDataWorkflow,
  isValidStatus,
  parseRepoData,
  parseUserData,
  reposSortComparator
};
