'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;

var _jsdom2 = require('jsdom');

var _jsdom3 = _interopRequireDefault(_jsdom2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsdom = _jsdom3.default.jsdom('<!doctype html><html><body></body></html>');
var window = _jsdom.window;


function copyPropertyRefs(src, target) {
  Object.keys(src).forEach(function (property) {
    if (typeof target[property] === 'undefined') {
      target[property] = src[property];
    }
  });
}

function setup() {
  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js'
  };
  copyPropertyRefs(window, global);
}