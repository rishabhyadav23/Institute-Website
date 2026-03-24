import { useState } from 'react';
import { requestPasswordReset } from '../api/authService';

export const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendLink = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');
    try {
      await requestPasswordReset(email);
      setIsSent(true);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to send reset link. Please check your email and try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFlow = () => {
    setIsSent(false);
    setEmail('');
    setError('');
  };

  return {
    email,
    setEmail,
    isLoading,
    isSent,
    error,
    handleSendLink,
    resetFlow
  };
};