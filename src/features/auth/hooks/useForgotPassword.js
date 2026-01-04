import { useState } from 'react';
import { requestPasswordReset } from '../api/authService';

export const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendLink = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setIsSent(true);
    } catch (error) {
      console.error("Failed to send reset link", error);
      // Handle error state here if needed
    } finally {
      setIsLoading(false);
    }
  };

  const resetFlow = () => {
    setIsSent(false);
    setEmail('');
  };

  return {
    email,
    setEmail,
    isLoading,
    isSent,
    handleSendLink,
    resetFlow
  };
};