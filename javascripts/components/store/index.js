import store from './store';
import actions from './actions';

store.dispatch(actions.github.onAuthenticate('daniloster', ['daniloster', 'leticiacalmon']));

export default store;
