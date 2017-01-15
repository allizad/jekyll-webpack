import React, {
    PropTypes
} from 'react';
import { Route, Redirect } from 'react-router';

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

const Routes = (() => (
    <Route path="/" component={Wrapper}>
        <Route component={HelloWorld} path="never-page" />
        <Route component={Github} path="portifolio" />
        <Route component={About} path="about" />

        <Route component={Blank} path="blank" />
        <Redirect from="*" to="blank" />
    </Route>
));

export default Routes;
