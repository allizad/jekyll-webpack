import axios from 'axios';
import Immutable from './immutable';

// Authorization: token OAUTH-TOKEN

const FactoryApi = Immutable({
    createApiRef: ({ headers = {} } = {}) => axios.create({
        headers: Object.assign({
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'json',
            dataType: 'json'
        }, headers)
    })
});

export default FactoryApi;
