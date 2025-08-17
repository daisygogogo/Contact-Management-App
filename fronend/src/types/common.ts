export type IApiErrorParams = {
  code: number;
  message: string;
  path: string;
  errorCode: number;
};

export class ApiError extends Error {
    code: number;
    message: string;
    path: any;
    errorCode: number;
  
    constructor({ code, message, path, errorCode }: IApiErrorParams) {
      super(message);
      this.name = 'ApiError';
      this.code = code;
      this.message = message;
      this.path = path;
      this.errorCode = errorCode;
      this.stack = new Error().stack;
    }
  }

export interface SuccessNotification {
  message: string;
  title?: string;
}

export interface NotificationOptions {
  showAlert?: boolean;
  autoHide?: boolean;
  duration?: number;
}