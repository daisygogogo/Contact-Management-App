import { ApiError, SuccessNotification, NotificationOptions } from '@/types/common';

export interface ErrorNotificationOptions extends NotificationOptions {}

class NotificationService {
  private static instance: NotificationService;
  private errorListeners: Array<(error: ApiError, options?: ErrorNotificationOptions) => void> = [];
  private successListeners: Array<(notification: SuccessNotification, options?: NotificationOptions) => void> = [];

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Error notification methods
  addErrorListener(listener: (error: ApiError, options?: ErrorNotificationOptions) => void) {
    this.errorListeners.push(listener);
  }

  removeErrorListener(listener: (error: ApiError, options?: ErrorNotificationOptions) => void) {
    const index = this.errorListeners.indexOf(listener);
    if (index > -1) {
      this.errorListeners.splice(index, 1);
    }
  }

  handleError(error: ApiError, options: ErrorNotificationOptions = {}) {
    const defaultOptions: ErrorNotificationOptions = {
      showAlert: true,
      autoHide: true,
      duration: 5000,
      ...options
    };

    this.errorListeners.forEach(listener => {
      listener(error, defaultOptions);
    });
  }

  handleApiError(error: any, options?: ErrorNotificationOptions) {
    if (error instanceof ApiError) {
      this.handleError(error, options);
    } else if (error?.response?.data) {
      const { internalCode, message, path, statusCode } = error.response.data;
      const apiError = new ApiError({ code: internalCode, message, path, errorCode: statusCode });
      this.handleError(apiError, options);
    } else {
      const genericError = new ApiError({ 
        code: -1, 
        message: error?.message || 'An unexpected error occurred', 
        path: '', 
        errorCode: 500 
      });
      this.handleError(genericError, options);
    }
  }

  // Success notification methods
  addSuccessListener(listener: (notification: SuccessNotification, options?: NotificationOptions) => void) {
    this.successListeners.push(listener);
  }

  removeSuccessListener(listener: (notification: SuccessNotification, options?: NotificationOptions) => void) {
    const index = this.successListeners.indexOf(listener);
    if (index > -1) {
      this.successListeners.splice(index, 1);
    }
  }

  showSuccess(notification: SuccessNotification, options?: NotificationOptions) {
    const defaultOptions: NotificationOptions = {
      showAlert: true,
      autoHide: true,
      duration: 3000,
      ...options
    };

    this.successListeners.forEach(listener => {
      listener(notification, defaultOptions);
    });
  }
}

export const notificationService = NotificationService.getInstance();
