import { StatusCodes } from 'http-status-codes';

class BadRequest extends Error {
  static code = StatusCodes.BAD_REQUEST;
  constructor(message: string) {
    super();
    this.name = 'BadRequest';
    this.message = message;
  }
}

export default BadRequest;
