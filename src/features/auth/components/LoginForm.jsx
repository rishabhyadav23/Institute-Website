import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const LoginForm = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  isLoading, 
  showPassword, 
  togglePassword 
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Email Input */}
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors w-5 h-5" />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full pl-12 pr-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Password</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors w-5 h-5" />
          <input 
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
            placeholder="••••••••"
            required
          />
          <button 
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Extras */}
      <div className="flex items-center justify-between">
        <div className="flex items-center h-5">
          <input id="remember" type="checkbox" className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-gray-300 bg-gray-100" />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-medium">Remember me</label>
        </div>
        <Link to="/forgot-password" className="text-sm font-bold text-brand-600 hover:text-brand-800 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <Button 
        type="submit" 
        className="w-full py-4 rounded-xl text-lg shadow-brand-900/30 hover:scale-[1.02]" 
        isLoading={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
};