import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';

// Placeholder Component taki baki pages blank na dikhein
const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
    <h1 className="text-3xl font-bold text-gray-300 mb-4">🚧 Work in Progress</h1>
    <p className="text-xl text-brand-600 font-semibold">{title} Page</p>
    <p className="text-gray-500 mt-2">Hum jald hi isse live karenge!</p>
  </div>
);

function App() {
  return (
    // Yahan <Router> MAT lagana, wo main.jsx me hai
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        
        {/* Actual Pages */}
        <Route path="categories" element={<Placeholder title="Exam Categories" />} />
        <Route path="live" element={<Placeholder title="Live Classes" />} />
        <Route path="notes" element={<Placeholder title="Study Material" />} />
        <Route path="tests" element={<Placeholder title="Test Series" />} />
        <Route path="contact" element={<Placeholder title="Contact Us" />} />
        <Route path="login" element={<Placeholder title="Student Login" />} />
        <Route path="signup" element={<Placeholder title="New Registration" />} />
        <Route path="course/:id" element={<Placeholder title="Course Details" />} />
      </Route>
    </Routes>
  );
}

export default App;