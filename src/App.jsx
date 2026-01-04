import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/auth/SignupPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'; 
import { CategoriesPage } from './pages/courses/CategoriesPage';
import { ExploreCoursesPage } from './pages/courses/ExploreCoursesPage';
import { NotesPage } from './pages/notes/NotesPage';
import { NotePreviewPage } from './pages/notes/NotePreviewPage';
import { TestSeriesPage } from './pages/tests/TestSeriesPage';
import { TestTakingPage } from './pages/tests/TestTakingPage';
import { LiveClassesPage } from './pages/live/LiveClassesPage';
import { LiveClassroomPage } from './pages/live/LiveClassroomPage';

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
        <Route path="signup" element={<SignupPage />} /> {/* Connect kiya */}
        <Route path="login" element={<LoginPage />}/>
        <Route path="forgot-password" element={<ForgotPasswordPage />} />


        <Route path="courses" element={<ExploreCoursesPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="notes/:id" element={<NotePreviewPage />} />
        <Route path="tests" element={<TestSeriesPage />} />
        <Route path="live" element={<LiveClassesPage />} />
        
      
        {/* Actual Pages */}
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="live" element={<Placeholder title="Live Classes" />} />
        <Route path="notes" element={<Placeholder title="Study Material" />} />
        <Route path="tests" element={<Placeholder title="Test Series" />} />
        <Route path="contact" element={<Placeholder title="Contact Us" />} />
        <Route path="login" element={<Placeholder title="Student Login" />} />
        <Route path="signup" element={<Placeholder title="New Registration" />} />
        <Route path="course/:id" element={<Placeholder title="Course Details" />} />
      </Route>
              <Route path="tests/:id/take" element={<TestTakingPage />} />
              <Route path="/live/:id" element={<LiveClassroomPage />} />

    </Routes>
  );
}

export default App;