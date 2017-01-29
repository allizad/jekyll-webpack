import FactoryApi from '../util/api';
import GithubHeaders from './github-headers';

class GihubRepoApi {
    constructor(metaData = {}) {
        this.metaData = metaData;
        this.api = FactoryApi.createApiRef({
            headers: {
                ...GithubHeaders,
                ...metaData.headers
            }
        });
    }

    get = (({ owner }) =>
        this.api.request({
            url: FactoryApi.applyAttributes(this.metaData.urlMappingEndpoint['github/repos/get'], { owner }),
            method: 'GET'
        })
    ).bind(this);
}



export default GihubRepoApi;
