import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Radio, ClipboardList, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const items = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/live', icon: Radio, label: 'Live' },
  { to: '/tests', icon: ClipboardList, label: 'Tests' },
];

export const BottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Hide on admin pages, test-taking page, and live classroom
  const hiddenPaths = ['/admin', '/tests/', '/live/'];
  if (hiddenPaths.some(p => location.pathname.startsWith(p) && location.pathname !== '/tests' && location.pathname !== '/live')) {
    return null;
  }

  const profileItem = {
    to: isAuthenticated ? '/dashboard' : '/login',
    icon: User,
    label: isAuthenticated ? 'Profile' : 'Login',
  };

  const allItems = [...items, profileItem];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 lg:hidden">
      <div className="flex items-center justify-around h-16 px-2 pb-safe">
        {allItems.map((item) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors ${
                isActive
                  ? 'text-brand-600'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
              {isActive && <span className="absolute top-0 w-8 h-0.5 bg-brand-600 rounded-full" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
