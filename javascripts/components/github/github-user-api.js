import FactoryApi from '../util/api';
import GithubHeaders from './github-headers';

class GithubUserApi {
    constructor(metadata = {}) {
        this.metadata = metadata;
        this.api = FactoryApi.createApiRef();
    }

    get = (({ owner }) =>
        this.api.request({
            url: FactoryApi.applyAttributes(this.metadata.urlMappingEndpoint['github/user/get'], { owner }),
            method: 'GET',
            headers: {
                ...GithubHeaders,
                ...(this.metadata.headers || {}) 
            }
        })
    ).bind(this);

    auth = (({ token }) =>
        // PUT /authorizations/clients/:client_id
        // this.api.request({
        //     url: FactoryApi.applyAttributes(this.metadata.urlMappingEndpoint['github/user/auth'], { client_id }),
        //     method: 'PUT',
        //     headers: {
        //         ...GithubHeaders
        //     },
        //     param: {
        //         client_secret,
        //         scopes: ['public_repo', 'user:email'],
        //         note: 'Github blog - codeinbox.me',
        //         note_url: 'https://daniloster.github.io'
        //     }
        // })
        Promise.resolve({ data: token, response: {} })
    ).bind(this);
}



export default GithubUserApi;
