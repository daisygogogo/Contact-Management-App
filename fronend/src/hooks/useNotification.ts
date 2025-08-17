import { useNotification as useNotificationContext } from '@/components/common/NotificationProvider';
import { notificationService } from '@/services/notification';
import { SuccessNotification, NotificationOptions } from '@/types/common';

export const useNotification = () => {
  const context = useNotificationContext();
  
  const showSuccess = (message: string, title?: string, options?: NotificationOptions) => {
    const notification: SuccessNotification = { message, title };
    context.showSuccess(notification, options);
  };

  const showSuccessWithService = (message: string, title?: string, options?: NotificationOptions) => {
    const notification: SuccessNotification = { message, title };
    notificationService.showSuccess(notification, options);
  };

  return {
    ...context,
    showSuccess,
    showSuccessWithService
  };
};
