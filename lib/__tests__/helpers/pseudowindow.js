import jsdom from 'jsdom'

const _jsdom = jsdom.jsdom('<!doctype html><html><body></body></html>')
const { window } = _jsdom;

function copyPropertyRefs(src, target) {
  Object.keys(src).forEach((property) => {
    if (typeof target[property] === 'undefined') {
      target[property] = src[property];
    }
  });
}

export function setup() {
  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js'
  };
  copyPropertyRefs(window, global);
}
