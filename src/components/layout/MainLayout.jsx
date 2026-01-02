import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar'; // <--- Import Navbar

export const MainLayout = () => {
  return (
    // 'dark:bg-gray-900' ensure karega ki dark mode me background black ho
    <div className="font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      
      {/* New Navbar Component */}
      <Navbar />
      
      <main>
        <Outlet />
      </main>
      
      <footer className="bg-gray-900 dark:bg-black text-white p-8 mt-auto border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2026 CodeMaster EdTech</p>
        </div>
      </footer>
    </div>
  );
};