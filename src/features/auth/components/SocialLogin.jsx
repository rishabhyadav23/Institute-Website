import React from 'react';

export const SocialLogin = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-semibold text-gray-700 dark:text-gray-300">
          <GoogleIcon className="w-5 h-5" /> Google
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-semibold text-gray-700 dark:text-gray-300">
          <AppleIcon className="w-5 h-5" /> Apple
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-white dark:bg-gray-900 px-3 text-gray-400">Or Login with Email</span>
        </div>
      </div>
    </>
  );
};

// --- SVG Icons ---
const GoogleIcon = (props) => (<svg viewBox="0 0 24 24" {...props}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>);
const AppleIcon = (props) => (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.65-.95 1.87.11 3.48 1.45 4.04 2.24-3.69 1.87-3.1 6.98.93 8.78-.65 1.55-1.54 3.08-3.7 5.16zM12.03 7.25c-.25-2.23 1.55-4.14 3.69-4.25.29 2.58-2.54 4.54-3.69 4.25z" /></svg>);