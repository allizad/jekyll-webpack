import FactoryApi from '../util/api';
import GithubHeaders from './github-headers';

class GithubPostApi {
  constructor(metadata = {}) {
    this.metadata = metadata;
    this.api = FactoryApi.createApiRef();
  }

  getAll = (() =>
    this.api.request({
      url: this.metadata.urlMappingEndpoint['github/blog/posts'],
      method: 'GET',
      data: {
        ref: 'master'
      },
      headers: {
        ...GithubHeaders,
        ...(this.metadata.headers || {})
      }
    })
  ).bind(this);

  get = (url =>
    this.api.request({
      url,
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3.raw'
      }
    })
  ).bind(this);
}



export default GithubPostApi;
