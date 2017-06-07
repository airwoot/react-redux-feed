'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withItemSchema;

var _recompose = require('recompose');

function withItemSchema(schema) {
  return (0, _recompose.withProps)({
    itemSchema: schema
  });
}