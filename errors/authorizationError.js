class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else if (handler.error instanceof AuthorizationError) {
      handler.response = {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

module.exports = AuthorizationError;
