import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axiosConfig';

export const SocialLogin = ({ mode = 'login' }) => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOAuthSuccess = async (provider, tokenData) => {
    try {
      const response = await api.post(`/auth/oauth/${provider}`, tokenData);
      const result = response.data.data || response.data;
      const token = result.token;
      const userData = { fullName: result.fullName, email: result.email, role: result.role };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      // Force page reload to update AuthContext state from localStorage
      window.location.href = result.role === 'ADMIN' ? '/admin' : '/';
    } catch (err) {
      setError(err?.response?.data?.message || `${provider} login failed. Please try again.`);
    }
  };

  // ===== GOOGLE =====
  const handleGoogleLogin = useCallback(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError('Google login is not configured yet.');
      return;
    }

    setGoogleLoading(true);
    setError('');

    // Load Google Identity Services script if not loaded
    if (!window.google?.accounts) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => initializeGoogle(clientId);
      script.onerror = () => {
        setError('Failed to load Google login. Check your internet connection.');
        setGoogleLoading(false);
      };
      document.body.appendChild(script);
    } else {
      initializeGoogle(clientId);
    }
  }, []);

  const initializeGoogle = (clientId) => {
    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          if (response.credential) {
            await handleOAuthSuccess('google', { idToken: response.credential });
          }
          setGoogleLoading(false);
        },
      });
      // Use the One Tap or popup
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: use button-triggered popup
          const btn = document.createElement('div');
          btn.id = 'g-signin-btn';
          btn.style.display = 'none';
          document.body.appendChild(btn);
          window.google.accounts.id.renderButton(btn, { type: 'icon', size: 'large' });
          btn.querySelector('div[role="button"]')?.click();
          setTimeout(() => btn.remove(), 100);
          setGoogleLoading(false);
        }
      });
    } catch {
      setError('Google login initialization failed.');
      setGoogleLoading(false);
    }
  };

  // ===== APPLE =====
  const handleAppleLogin = useCallback(() => {
    const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
    if (!clientId) {
      setError('Apple login is not configured yet.');
      return;
    }

    setAppleLoading(true);
    setError('');

    if (!window.AppleID) {
      const script = document.createElement('script');
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      script.async = true;
      script.onload = () => initializeApple(clientId);
      script.onerror = () => {
        setError('Failed to load Apple login.');
        setAppleLoading(false);
      };
      document.body.appendChild(script);
    } else {
      initializeApple(clientId);
    }
  }, []);

  const initializeApple = async (clientId) => {
    try {
      window.AppleID.auth.init({
        clientId,
        scope: 'name email',
        redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI || window.location.origin,
        usePopup: true,
      });

      const response = await window.AppleID.auth.signIn();
      if (response.authorization) {
        await handleOAuthSuccess('apple', {
          idToken: response.authorization.id_token,
          authorizationCode: response.authorization.code,
          fullName: response.user ? `${response.user.name?.firstName || ''} ${response.user.name?.lastName || ''}`.trim() : null,
        });
      }
    } catch (err) {
      if (err.error !== 'popup_closed_by_user') {
        setError('Apple login failed. Please try again.');
      }
    } finally {
      setAppleLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {googleLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-brand-600 rounded-full animate-spin" />
          ) : (
            <GoogleIcon className="w-5 h-5" />
          )}
          Google
        </button>
        <button
          onClick={handleAppleLogin}
          disabled={appleLoading}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {appleLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          ) : (
            <AppleIcon className="w-5 h-5" />
          )}
          Apple
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-white dark:bg-gray-900 px-3 text-gray-400">
            {mode === 'signup' ? 'Or Sign up with Email' : 'Or Login with Email'}
          </span>
        </div>
      </div>
    </>
  );
};

// --- SVG Icons ---
const GoogleIcon = (props) => (<svg viewBox="0 0 24 24" {...props}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>);
const AppleIcon = (props) => (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.65-.95 1.87.11 3.48 1.45 4.04 2.24-3.69 1.87-3.1 6.98.93 8.78-.65 1.55-1.54 3.08-3.7 5.16zM12.03 7.25c-.25-2.23 1.55-4.14 3.69-4.25.29 2.58-2.54 4.54-3.69 4.25z" /></svg>);
