import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth';
import { useLoadingStore } from './stores/loading';
import { useThemeStore } from './stores/theme';
import { LoadingOverlay } from './components/ui/loading';
import Layout from './components/layout/Layout';
import { NotificationProvider } from './components/common/NotificationProvider';

import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated() || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { user, setUser, setToken } = useAuthStore();
  const { isLoading, loadingText } = useLoadingStore();
  const { theme } = useThemeStore();

  // Check for existing auth on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser && !user) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to restore auth state:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, [user, setUser, setToken]);

  // Apply theme to document for all pages
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <NotificationProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Contacts />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          {/* Global Loading Overlay */}
          <LoadingOverlay isLoading={isLoading} text={loadingText} />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
