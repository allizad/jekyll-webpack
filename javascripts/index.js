/* global document, window */
import React from 'react';
import { render } from 'react-dom';
import {
  Components,
  Header
} from './components';

const container = document.getElementById('root');
if (container) {
    render(<Components />, container);
}

const {
  root,
  pages,
  target
} = window.$blogConfig.navigation;
render(<Header root={root} pages={pages} />, target);
