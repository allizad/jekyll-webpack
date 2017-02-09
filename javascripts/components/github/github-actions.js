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

function onFetchPosts() {
  return {
    type: constants.FETCH_POSTS
  };
}

function onFetchContents(page) {
  return {
    type: constants.FETCH_CONTENTS,
    page
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

function onSetPosts(posts) {
  return {
    type: constants.SET_POSTS,
    posts
  };
}

function onSetContents(contents) {
  return {
    type: constants.SET_CONTENTS,
    contents
  };
}

function onSetPage(page) {
  return {
    type: constants.SET_PAGE,
    page
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

function onSetPostsStatus(status) {
  return {
    type: constants.SET_POSTS_STATUS,
    status
  };
}

function onSetContentsStatus(status) {
  return {
    type: constants.SET_CONTENTS_STATUS,
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
  onFetchPosts,
  onFetchContents,
  onSetRepos,
  onSetUsers,
  onSetPosts,
  onSetContents,
  onSetPage,
  onSetAuthStatus,
  onSetUsersStatus,
  onSetPostsStatus,
  onSetContentsStatus,
  onSetReposStatus,
  onAuthenticate
};
