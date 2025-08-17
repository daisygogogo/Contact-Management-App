import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-20 h-20 text-3xl'
};

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  fallback, 
  size = 'md',
  className 
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || fallback}
        className={cn(
          'rounded-full object-cover',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium',
        sizeClasses[size],
        className
      )}
    >
      <span>{fallback}</span>
    </div>
  );
};

export default Avatar;
