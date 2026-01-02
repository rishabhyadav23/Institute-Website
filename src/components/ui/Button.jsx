import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  ...props 
}) => {
  const baseStyles = "font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-sans tracking-wide";
  
  const variants = {
    // Updated to use brand-900 (Maroon)
    primary: "bg-brand-900 text-white hover:bg-brand-800 shadow-lg shadow-brand-900/20 active:scale-95 border border-transparent",
    
    // Secondary is now outline with Maroon text
    secondary: "bg-white border-2 border-brand-900 text-brand-900 hover:bg-brand-50 active:scale-95",
    
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-brand-900 dark:text-gray-300 dark:hover:bg-gray-800",
    
    // Accent can stay orange or match maroon theme
    accent: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  );
};