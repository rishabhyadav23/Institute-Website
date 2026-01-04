import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '../../../components/ui/Button'; // Adjusted path to shared UI

export const ForgotPasswordForm = ({ email, setEmail, isLoading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
          Registered Email
        </label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors w-5 h-5" />
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-12 pr-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-medium text-gray-900 dark:text-white"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full py-3.5 rounded-xl text-lg shadow-lg" 
        isLoading={isLoading}
      >
        Send Reset Link
      </Button>
    </form>
  );
};