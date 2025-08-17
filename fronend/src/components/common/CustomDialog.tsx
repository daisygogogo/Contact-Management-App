import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface CustomDialogRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface CustomDialogProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  onOpenChange?: (open: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

const sizeClasses = {
  sm: 'max-w-sm !max-w-sm',
  md: 'max-w-md !max-w-md',
  lg: 'max-w-lg !max-w-lg',
  xl: 'max-w-4xl !max-w-4xl',
  full: 'max-w-[95vw] !max-w-[95vw]',
};

export const CustomDialog = forwardRef<CustomDialogRef, CustomDialogProps>(
  (
    {
      title,
      children,
      className,
      contentClassName,
      headerClassName,
      titleClassName,
      size = 'md',
      showCloseButton = true,
      onOpenChange,
      onOpen,
      onClose,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setOpen(true);
        onOpen?.();
      },
      close: () => {
        setOpen(false);
        onClose?.();
      },
      toggle: () => {
        const newOpen = !open;
        setOpen(newOpen);
        if (newOpen) {
          onOpen?.();
        } else {
          onClose?.();
        }
      },
    }));

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
      onOpenChange?.(newOpen);
      if (!newOpen) {
        onClose?.();
      } else {
        onOpen?.();
      }
    };

    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className={cn(
            sizeClasses[size],
            contentClassName
          )}
        >
          {(title || showCloseButton) && (
            <DialogHeader className={cn('space-y-3', headerClassName)}>
              {title && (
                <DialogTitle className={cn('text-lg font-semibold', titleClassName)}>
                  {title}
                </DialogTitle>
              )}
            </DialogHeader>
          )}
          <div className={cn('space-y-4', className)}>
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

CustomDialog.displayName = 'CustomDialog'; 