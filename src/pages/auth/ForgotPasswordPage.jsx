import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Logic
import { useForgotPassword } from '../../features/auth/hooks/useForgotPassword';

// Components
import { ForgotPasswordHeader } from '../../features/auth/components/ForgotPasswordHeader';
import { ForgotPasswordForm } from '../../features/auth/components/ForgotPasswordForm';
import { ForgotPasswordSuccess } from '../../features/auth/components/ForgotPasswordSuccess';

export const ForgotPasswordPage = () => {
  // Use Custom Hook
  const { 
    email, 
    setEmail, 
    isLoading, 
    isSent, 
    handleSendLink, 
    resetFlow 
  } = useForgotPassword();

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-brand-100 dark:bg-brand-900/10 rounded-full blur-3xl opacity-50 animate-blob"></div>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-white/20 dark:border-gray-800 relative z-10 overflow-hidden backdrop-blur-xl">
        
        {/* 1. Header Section */}
        <ForgotPasswordHeader isSent={isSent} email={email} />

        <div className="p-8">
          {/* 2. Conditional Body Section */}
          {!isSent ? (
            <ForgotPasswordForm 
              email={email} 
              setEmail={setEmail} 
              isLoading={isLoading} 
              onSubmit={handleSendLink} 
            />
          ) : (
            <ForgotPasswordSuccess onReset={resetFlow} />
          )}

          {/* 3. Footer / Back Link */}
          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};