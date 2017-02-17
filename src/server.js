const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

// if we want XML, is probably not the most efficient way to separate them
// was just a fast easy solution as I knew it would work and be more readable
const urlStructXML = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': xmlHandler.success,
  '/badRequest': xmlHandler.badRequest,
  '/unauthorized': xmlHandler.unauthorized,
  '/forbidden': xmlHandler.forbidden,
  '/internal': xmlHandler.internal,
  '/notImplemented': xmlHandler.notImplemented,
  notFound: xmlHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');
  // if the head type is text/xml
  if (acceptedTypes[0] === 'text/xml') {
    if (urlStructXML[parsedUrl.pathname]) {
      urlStructXML[parsedUrl.pathname](request, response, params);
    } else {
      urlStructXML.notFound(request, response, params);
    }
    // else if JSON
  } else if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
