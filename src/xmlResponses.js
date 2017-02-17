const respond = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': request.headers.accept });
  response.write(content);
  response.end();
};

const success = (request, response) => {
  // create a valid XML string with name and age tags.
  let responseXML = '<response>';
  responseXML += '<message>This is a successful response</message>';
  responseXML += '</response>';

  // return response passing out string and content type
  respond(request, response, 200, responseXML);
};

const badRequest = (request, response, params) => {
  let responseXML = '<response>';
  responseXML += '<message>This request has the required parameters</message>';
  responseXML += '</response>';

  if (!params.valid || params.valid !== 'true') {
    responseXML = '<response>';
    responseXML += '<message>Missing valid query parameter set to true</message>';
    responseXML += '<id>badRequest</id>';
    responseXML += '</response>';

    // return response passing out string and content type
    return respond(request, response, 400, responseXML);
  }

  return respond(request, response, 200, responseXML);
};

const unauthorized = (request, response, params) => {
  let responseXML = '<response>';
  responseXML += '<message>This request has the required parameters</message>';
  responseXML += '</response>';

  if (!params.loggedIn || params.loggedIn !== 'true') {
    responseXML = '<response>';
    responseXML += '<message>Missing loggedIn query parameter set to true</message>';
    responseXML += '<id>unauthorized</id>';
    responseXML += '</response>';

    // return response passing out string and content type
    return respond(request, response, 401, responseXML);
  }

  return respond(request, response, 200, responseXML);
};

const forbidden = (request, response) => {
  let responseXML = '<response>';
  responseXML += '<message>You do not have access to this content</message>';
  responseXML += '<id>forbidden</id>';
  responseXML += '</response>';

  respond(request, response, 403, responseXML);
};

const internal = (request, response) => {
  let responseXML = '<response>';
  responseXML += '<message>Internal Server Error. Something went wrong.</message>';
  responseXML += '<id>internalError</id>';
  responseXML += '</response>';

  respond(request, response, 500, responseXML);
};

const notImplemented = (request, response) => {
  let responseXML = '<response>';
  responseXML += '<message>A get request for this page has not been implemented yet. Check again later for updated content</message>';
  responseXML += '<id>notImplemented</id>';
  responseXML += '</response>';

  respond(request, response, 501, responseXML);
};

const notFound = (request, response) => {
  let responseXML = '<response>';
  responseXML += '<message>The page you are looking for was not found.</message>';
  responseXML += '<id>notFound</id>';
  responseXML += '</response>';

  respond(request, response, 404, responseXML);
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  respond,
};
