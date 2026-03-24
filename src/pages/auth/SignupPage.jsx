import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

// Logic
import { useSignup } from '../../features/auth/hooks/useSignup';

// Components
import { AuthHeader } from '../../features/auth/components/AuthHeader';
import { SocialLogin } from '../../features/auth/components/SocialLogin';
import { SignupForm } from '../../features/auth/components/SignupForm'; 

export const SignupPage = () => {
  // Use Custom Hook
  const {
    formData,
    handleChange,
    showPassword,
    togglePassword,
    isLoading,
    error,
    handleSubmit
  } = useSignup();

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* --- Background Decoration --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-200 dark:bg-brand-900/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* --- Main Card Container --- */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800 relative z-10 overflow-hidden backdrop-blur-xl">
        
        {/* 1. Header */}
        <AuthHeader
          title="Create Account"
          subtitle="Start your learning journey today"
          icon={<User className="w-8 h-8 text-white" />}
        />

        {/* Card Body */}
        <div className="p-8 sm:p-10">
          
          {/* 2. Social Buttons */}
          <SocialLogin mode="signup" />

          {/* 3. Signup Form */}
          <SignupForm
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
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-700 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};