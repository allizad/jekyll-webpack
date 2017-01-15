require('source-map-support').install({
    handleUncaughtExceptions: false,
    target: 'node'
});
require('babel-register')({
    presets: ['es2015', 'stage-0', 'react']
});

var jsdom = require('jsdom').jsdom;
var chai = require('chai');

global.expect = chai.expect;
global.assert = chai.assert;

var exposedProperties = ['window', 'navigator', 'document'];
var document = jsdom('');
global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global['Event'] = global['Event'] || function Event(){};
global['Element'] = global['Element'] || function Element(){};
global['HTMLDocument'] = global['HTMLDocument'] || function HTMLDocument(){};

global.navigator = {
    userAgent: 'node.js'
};
