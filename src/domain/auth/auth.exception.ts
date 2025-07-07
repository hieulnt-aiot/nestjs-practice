import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthErrorCode } from './auth.errors';

type AuthExceptionInput = {
  message: string;
  code: AuthErrorCode;
  status?: HttpStatus;
};

export class AuthException extends HttpException {
  constructor({
    message,
    code,
    status = HttpStatus.BAD_REQUEST,
  }: AuthExceptionInput) {
    super({ success: false, code, message }, status);
  }
}
