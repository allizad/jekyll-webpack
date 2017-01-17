import React from 'react';
import {
    shallow,
    mount,
    render
} from 'enzyme';
import HelloWorld from './hello-world';

describe('<HelloWorld />', () => {
    it('should show Hello World with class hello-world--title for shallow', () => {
        expect(shallow(<HelloWorld />).find('h1')).to.be.defined;
    });
    it('should show Hello World with text "Hello world!" for mount', () => {
        expect(mount(<HelloWorld />).text()).to.equal('Hello world!');
    });
    it('should show Hello World with text "Hello world!" for render', () => {
        expect(render(<HelloWorld />).text()).to.equal('Hello world!');
    });
});
