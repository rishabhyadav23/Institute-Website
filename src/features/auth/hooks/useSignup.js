import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authService';

export const useSignup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
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
      await registerUser(formData);
      // On success, redirect to home or dashboard
      navigate('/'); 
    } catch (error) {
      console.error("Signup failed", error);
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