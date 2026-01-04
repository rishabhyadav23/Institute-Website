import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authService';

export const useLogin = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await loginUser(formData);
      // On success, redirect to home or dashboard
      navigate('/'); 
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    showPassword,
    togglePassword,
    isLoading,
    handleSubmit
  };
};