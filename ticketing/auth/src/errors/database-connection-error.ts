export class DatabaseConnectionError extends Error {
  reason = "DB connection module";

  constructor() {
    super();

    // Extend a class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
