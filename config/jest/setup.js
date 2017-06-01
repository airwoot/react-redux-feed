const { Response, Headers, Request } = require('whatwg-fetch');
global.Response = Response;
global.Headers = Headers;
global.Request = Request;

global.fetch = require('./mock-fetch');
