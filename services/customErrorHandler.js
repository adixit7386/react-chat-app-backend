class customErrorHandler extends Error {
  constructor(statusCode, msg) {
    super();
    this.status = statusCode;
    this.message = msg;
  }
  static inCompleteContent(message) {
    return new customErrorHandler(400, message);
  }
  static routeNotFound(message) {
    return new customErrorHandler(404, message);
  }
  static alreadyExist(message) {
    return new customErrorHandler(409, message);
  }
  static userNotFound(message) {
    return new customErrorHandler(409, message);
  }
  static incompleteData(message) {
    return new customErrorHandler(405, message);
  }
  static noUserId(message) {
    return new customErrorHandler(409, message);
  }
  static wrongCredentials(message) {
    return new customErrorHandler(409, message);
  }
  static unAuthorized(message) {
    return new customErrorHandler(401, message);
  }
  static notFound(message) {
    return new customErrorHandler(404, message);
  }
  static serverError(message) {
    return new customErrorHandler(500, message);
  }
}

module.exports = customErrorHandler;
