import React from 'react';
import { KeyRound, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordHeader = ({ isSent, email }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-100 dark:border-gray-800 text-center">
      <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-600 dark:text-brand-400">
        {isSent ? <CheckCircle2 size={28} /> : <KeyRound size={28} />}
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {isSent ? 'Check your mail' : 'Forgot Password?'}
      </h2>
      
      <p className="text-gray-500 text-sm mt-1 px-4">
        {isSent 
          ? `We have sent a password recovery link to ${email}`
          : 'No worries, we will send you reset instructions.'}
      </p>
    </div>
  );
};