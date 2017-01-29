import React, {
    PropTypes
} from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import HelloWorld from './hello-world';
import Github from './github';
import About from './about';


const Wrapper = (({ children }) => (
    <div>{children}</div>
));

const Blank = (() => (
    <i />
));

Wrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf([
            PropTypes.string,
            PropTypes.node,
            PropTypes.element
        ]),
        PropTypes.string,
        PropTypes.node,
        PropTypes.element
    ])
};

const Components = (() => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Wrapper}>
                <Route component={HelloWorld} path="never-page" />
                <Route component={Github} path="portifolio" />
                <Route component={About} path="about" />

                <Route component={Blank} path="*" />
            </Route>
        </Router>
    </Provider>
));

export default Components;
