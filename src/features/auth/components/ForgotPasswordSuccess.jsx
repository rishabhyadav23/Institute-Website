import React from 'react';
import { Button } from '../../../components/ui/Button';

export const ForgotPasswordSuccess = ({ onReset }) => {
  return (
    <div className="space-y-4">
      <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-xl text-sm border border-green-200 dark:border-green-800 flex gap-2">
        <span>📩</span>
        <p>If the email exists in our system, you will receive a reset link shortly.</p>
      </div>
      
      <Button 
        variant="secondary" 
        className="w-full py-3.5 rounded-xl border-gray-200"
        onClick={onReset}
      >
        Try another email
      </Button>
    </div>
  );
};