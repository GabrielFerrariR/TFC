import { StatusCodes } from 'http-status-codes';

class Unauthorized extends Error {
  public code = StatusCodes.UNAUTHORIZED;
  constructor(message: string) {
    super();
    this.name = 'Unauthorized';
    this.message = message;
  }
}

export default Unauthorized;
