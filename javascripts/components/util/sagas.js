import Immutable from './immutable';

function getter(section) {
    const get = ({
        'string': state => state[section],
        'undefined': state => state
    })[typeof section];

    return state => get(state);
}

const SagasUtils = Immutable({
    getter
});

export default SagasUtils;
