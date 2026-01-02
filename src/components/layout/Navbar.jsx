import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Zap, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';

const NAV_ITEMS = [
  { name: 'Exam Categories', path: '/categories' },
  { name: 'Live Classes', path: '/live' },
  { name: 'Study Material', path: '/notes' },
  { name: 'Test Series', path: '/tests' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-800' 
          : 'bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* --- 1. CREATIVE LOGO: Masterbaazi --- */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* Icon Box */}
            <div className="w-10 h-10 bg-brand-900 rounded-tr-2xl rounded-bl-2xl flex items-center justify-center text-white shadow-lg shadow-brand-900/20 transform group-hover:rotate-12 transition-transform duration-300">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            
            {/* Text Logo */}
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight">
                Master<span className="text-brand-600 italic">Baazi</span>
              </span>
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase pl-1">
                Jeet Ki Taiyari
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-brand-700`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* 3. Right Side Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-all"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-brand-700 dark:text-white px-3">
                Log in
              </Link>
              <Link to="/signup">
                <Button size="md" className="shadow-brand-900/20 font-bold">
                  Get Started <ChevronRight size={16} className="ml-1"/>
                </Button>
              </Link>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 rounded-lg"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};