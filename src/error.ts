export const createCustomError = (message: string, name = Error.name) => {
  const error = new Error(message);
  error.name = name;
  return error;
};

export enum ErrorCode {
  'TYPE_IS_NOT_ITERABLE' = 601,
}

export class BeanError extends Error {
  errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.errorCode = errorCode;
  }
}
