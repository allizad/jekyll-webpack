/* global document */
import React from 'react';
import { render } from 'react-dom';
import Components from './components';

const root = document.getElementById('root');
if (root) {
    render(<Components />, root);
}
