import React from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const SignupForm = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  isLoading, 
  showPassword, 
  togglePassword 
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Full Name */}
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Full Name</label>
        <input 
          type="text" 
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Ex. Rishabh Yadav" 
          className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ex. rishabh@example.com" 
          className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
            placeholder="Create a strong password"
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

      {/* Terms Checkbox */}
      <div className="flex items-start gap-3 pt-2">
        <div className="flex items-center h-5">
          <input id="terms" type="checkbox" className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-gray-300" required />
        </div>
        <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          I agree to the <a href="#" className="text-brand-600 hover:underline">Terms of Service</a> and <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a>.
        </label>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full py-4 rounded-xl text-lg shadow-brand-900/30 hover:scale-[1.02]" 
        isLoading={isLoading}
      >
        Create Free Account <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </form>
  );
};