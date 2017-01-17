const createReducers = ((initialState = {}, reducersMapping = {}) => (
    (state = initialState, action = {}) => {
        const reducer = reducersMapping[action.type] || (() => {});
        const proposedState = reducer(state, action);
        if (Object.keys(proposedState).length) {
            return Object.assign({}, state, proposedState);
        }
        return state;
    }
));

export { createReducers };
export default createReducers;
