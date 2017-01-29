import FactoryApi from '../util/api';
import GithubHeaders from './github-headers';

class GihubUserApi {
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
        this.api.get(FactoryApi.applyAttributes(this.metaData.urlMappingEndpoint['github/repos/owner/repo/readme/get'], { owner }))
    ).bind(this);
}



export default GihubUserApi;
