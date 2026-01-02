import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';

// Placeholder pages for clean routing test
const CourseDetail = () => <div className="p-10">Course Detail Page</div>;
const Dashboard = () => <div className="p-10">Dashboard Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="course/:id" element={<CourseDetail />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;