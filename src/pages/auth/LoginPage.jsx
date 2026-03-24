import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

// Logic
import { useLogin } from '../../features/auth/hooks/useLogin';

// Components
import { AuthHeader } from '../../features/auth/components/AuthHeader';
import { SocialLogin } from '../../features/auth/components/SocialLogin';
import { LoginForm } from '../../features/auth/components/LoginForm';

export const LoginPage = () => {
  // Use Custom Hook
  const {
    formData,
    handleChange,
    showPassword,
    togglePassword,
    isLoading,
    error,
    handleSubmit
  } = useLogin();

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-brand-200 dark:bg-brand-900/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800 relative z-10 overflow-hidden backdrop-blur-xl">
        
        {/* 1. Header */}
        <AuthHeader
          title="Welcome Back"
          subtitle="Sign in to continue your preparation"
          icon={<User className="w-8 h-8 text-white" />}
        />

        <div className="p-8 sm:p-10">
          
          {/* 2. Social Buttons */}
          <SocialLogin />

          {/* 3. Login Form */}
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            showPassword={showPassword}
            togglePassword={togglePassword}
          />

          {/* 4. Footer */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-brand-700 hover:underline hover:text-brand-800">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};