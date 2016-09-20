import React, { Component } from 'react';
import {render} from 'react-dom';
import Hello from './components/Hello';

class App extends Component {
  render() {
    return (
      <Hello />
    )
  }
}

render(<App />, document.getElementById('root'));


/* global document */
import React from 'react';
import { render } from 'react-dom';
import HelloWorld from '../src/hello-world';

render(<HelloWorld />, document.getElementById('root'));