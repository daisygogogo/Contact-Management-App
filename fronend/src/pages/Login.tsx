import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../types';
import { authService } from '../services/auth';
import { useAuthStore } from '../stores/auth';
import { useLoadingStore } from '../stores/loading';
import { useNotification } from '../hooks/useNotification';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { PasswordInput } from '../components/ui/password-input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const { showLoading, hideLoading } = useLoadingStore();
  const { showSuccess } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      showLoading('Signing in...');

      const response = await authService.login(data);
      
      if (response && response.data) {
        const { user, accessToken } = response.data;
        
        setUser(user);
        setToken(accessToken);
        
        // Store token in localStorage
        localStorage.setItem('authToken', accessToken);
        
        showSuccess('Welcome back!', 'Login Successful');
        
        // Add a small delay to ensure state updates are processed
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      }
    } catch (error: any) {
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Sign in to your account</CardTitle>
          <p className="text-muted-foreground">
            Welcome back to Contact Admin
          </p>
        </CardHeader>
        
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="space-y-4">
              <div className='space-y-2'>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  {...register('password')}
                  className={errors.password ? 'border-destructive' : ''}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Sign in
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
