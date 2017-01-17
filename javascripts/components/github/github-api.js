import FactoryApi from '../util/api';

const api = FactoryApi.createApiRef({
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'json',
        Authorization: 'token cc5a0422e603617f646ae8b5e1112d5502bfc278'
    }
});

function GihubApi(urlMappingEndpoint, metaData) {
    this.get = (url) => {
        api.get(urlMappingEndpoint['github/repos/get'])
    }
}



export default api;
