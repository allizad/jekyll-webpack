import axios from 'axios';
import Immutable from './immutable';

const FactoryApi = Immutable({
    createApiRef: ({ headers } = {}) =>
        Boolean(headers) 
        ? axios.create({
            headers: {
                ...headers
            }
        })
        : axios.create(),
    defaultHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'json'
    },
    applyAttributes: (uri, attributes) =>
        Object.keys(attributes).reduce(
            (endpoint, key) => endpoint.replace(`:${key}`, attributes[key]), uri
        )
});

export default FactoryApi;
