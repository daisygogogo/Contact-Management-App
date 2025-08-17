import React from 'react';
import { Menu} from 'lucide-react';
import { useAuthStore } from '../../stores/auth';
import { Button } from '../ui/button';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const { user } = useAuthStore();

  return (
    <header className="bg-card border-b border-border h-16 flex items-center px-[60px] shadow-sm">
      <div className="flex items-center space-x-4 flex-shrink-0">
        <Button
          onClick={onSidebarToggle}
          variant="ghost"
          size="sm"
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden md:flex items-center space-x-2">

        </div>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center space-x-4 flex-shrink-0">

        {/* User menu */}
        <div className="flex items-center space-x-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-foreground">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role}
            </p>
          </div>
          
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-semibold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
