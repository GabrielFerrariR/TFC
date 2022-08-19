import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface CustomError extends Error {
  code: number,
}

const errorMidddleware: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { code } = err;
  console.log('🚀 ~ file: error.middleware.ts ~ line 15 ~ code', code);
  console.log('🚀 ~ file: error.middleware.ts ~ line 15 ~ err', err);
  if (code) return res.status(code).json({ message: err.message });
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};
export default errorMidddleware;
