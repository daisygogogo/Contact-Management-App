import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  LogOut, 
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';
import { Button } from '../ui/button';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const navigation = [
    { name: 'Contacts', href: '/', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">
            Contact Admin
          </h1>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      

        {/* Navigation */}
        <nav className="flex-1 px-6 py-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                `}
                onClick={() => window.innerWidth < 1024 && onToggle()}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border space-y-2">
          {/* Theme toggle */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="w-full justify-start"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-5 w-5 mr-3" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 mr-3" />
                Dark Mode
              </>
            )}
          </Button>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
