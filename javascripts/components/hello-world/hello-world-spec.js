import React from 'react';
import {
    shallow,
    mount,
    render
} from 'enzyme';
import HelloWorld from './hello-world';

describe('<HelloWorld />', () => {
    it('should show Hello World with class hello-world--title for shallow', () => {
        expect(shallow(<HelloWorld />).is('.hello-world--title')).to.equal(true);
    });
    it('should show Hello World with text "hello world!" for mount', () => {
        expect(mount(<HelloWorld />).text()).to.equal('hello world!');
    });
    it('should show Hello World with text "hello world!" for render', () => {
        expect(render(<HelloWorld />).text()).to.equal('hello world!');
    });
});
