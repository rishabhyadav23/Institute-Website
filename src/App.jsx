import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/auth/SignupPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ExploreCoursesPage } from './pages/courses/ExploreCoursesPage';
import { CourseDetailPage } from './pages/courses/CourseDetailPage';
import { NotesPage } from './pages/notes/NotesPage';
import { NotePreviewPage } from './pages/notes/NotePreviewPage';
import { TestSeriesPage } from './pages/tests/TestSeriesPage';
import { TestTakingPage } from './pages/tests/TestTakingPage';
import { LiveClassesPage } from './pages/live/LiveClassesPage';
import { LiveClassroomPage } from './pages/live/LiveClassroomPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useAuth } from './context/AuthContext';

// Admin imports
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminNotes } from './pages/admin/AdminNotes';
import { AdminTests } from './pages/admin/AdminTests';
import { AdminLiveClasses } from './pages/admin/AdminLiveClasses';
import { AdminBanners } from './pages/admin/AdminBanners';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminStudents } from './pages/admin/AdminStudents';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<ExploreCoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="notes/:id" element={<NotePreviewPage />} />
        <Route path="tests" element={<TestSeriesPage />} />
        <Route path="live" element={<LiveClassesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="tests/:id/take" element={<TestTakingPage />} />
      <Route path="live/:id" element={<LiveClassroomPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="notes" element={<AdminNotes />} />
        <Route path="tests" element={<AdminTests />} />
        <Route path="live" element={<AdminLiveClasses />} />
        <Route path="banners" element={<AdminBanners />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="students" element={<AdminStudents />} />
      </Route>
    </Routes>
  );
}

export default App;
