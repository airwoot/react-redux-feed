'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mockResponse;
function mockResponse(status, statusText, response) {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};