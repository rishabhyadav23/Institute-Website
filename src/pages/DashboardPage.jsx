import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Clock, Trophy, Play, Calendar, Star, ArrowRight,
  TrendingUp, Target, Award, Loader2, CheckCircle, BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, getEnrolledCourses, getRecentTestAttempts, getUpcomingLiveClasses } from '../api/dashboardApi';

const FALLBACK_ENROLLED = [
  { id: 1, title: 'IIT JEE 2026 - Foundation Batch', progress: 35, totalLessons: 250, completedLessons: 88, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80', nextLesson: 'Mechanics - Rotational Motion' },
  { id: 2, title: 'NEET Biology Complete Course', progress: 60, totalLessons: 120, completedLessons: 72, image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=400&q=80', nextLesson: 'Genetics - Mendelian Inheritance' },
  { id: 3, title: 'NDA Maths & GK Preparation', progress: 80, totalLessons: 90, completedLessons: 72, image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=400&q=80', nextLesson: 'Trigonometry - Advanced Problems' },
];

const FALLBACK_TESTS = [
  { id: 1, title: 'JEE Mains Full Mock Test 5', score: 142, total: 200, date: '2 days ago', percentage: 71 },
  { id: 2, title: 'NEET Biology Chapter Test - Genetics', score: 85, total: 120, date: '5 days ago', percentage: 71 },
  { id: 3, title: 'Class 12 Physics Weekly Test', score: 18, total: 20, date: '1 week ago', percentage: 90 },
];

const FALLBACK_LIVE = [
  { id: 1, title: 'JEE Physics - Electrostatics Doubt Session', instructor: 'Mr. Rajesh Sharma', time: 'Today, 6:00 PM', status: 'upcoming' },
  { id: 2, title: 'NEET Chemistry - Organic Reactions', instructor: 'Dr. Neha Gupta', time: 'Tomorrow, 10:00 AM', status: 'upcoming' },
  { id: 3, title: 'NDA Maths - Calculus Masterclass', instructor: 'Mr. Vikram Singh', time: 'Sat, 4:00 PM', status: 'upcoming' },
];

export const DashboardPage = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState(FALLBACK_ENROLLED);
  const [tests, setTests] = useState(FALLBACK_TESTS);
  const [liveClasses, setLiveClasses] = useState(FALLBACK_LIVE);
  const [stats, setStats] = useState({ coursesEnrolled: 3, testsAttempted: 12, hoursLearned: 87, avgScore: 76 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [statsRes, coursesRes, testsRes, liveRes] = await Promise.allSettled([
          getDashboardStats(),
          getEnrolledCourses(),
          getRecentTestAttempts(),
          getUpcomingLiveClasses(),
        ]);
        if (statsRes.status === 'fulfilled' && statsRes.value.data) setStats(statsRes.value.data);
        if (coursesRes.status === 'fulfilled' && coursesRes.value.data?.length > 0) setEnrolledCourses(coursesRes.value.data);
        if (testsRes.status === 'fulfilled' && testsRes.value.data?.length > 0) setTests(testsRes.value.data);
        if (liveRes.status === 'fulfilled' && liveRes.value.data?.length > 0) setLiveClasses(liveRes.value.data);
      } catch {
        // Use fallback data
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-20">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                Welcome back, {user?.name || 'Student'}!
              </h1>
              <p className="text-white/60 text-sm">Continue your learning journey. You're doing great.</p>
            </div>
            <Link to="/courses">
              <Button size="md" className="bg-white text-brand-900 hover:bg-gray-100 rounded-xl font-bold shadow-xl">
                Browse Courses <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: 'Courses Enrolled', value: stats.coursesEnrolled, color: 'from-blue-500 to-indigo-600' },
            { icon: Target, label: 'Tests Attempted', value: stats.testsAttempted, color: 'from-green-500 to-emerald-600' },
            { icon: Clock, label: 'Hours Learned', value: stats.hoursLearned, color: 'from-purple-500 to-violet-600' },
            { icon: BarChart3, label: 'Avg. Score', value: `${stats.avgScore}%`, color: 'from-orange-500 to-red-500' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-lg transition-shadow"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">My Courses</h2>
            <Link to="/courses" className="text-sm text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm line-clamp-1">{course.title}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span className="font-bold text-brand-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-4">
                    <div
                      className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Play className="w-3 h-3" />
                    <span>Next: {course.nextLesson}</span>
                  </div>
                  <Link to={`/courses/${course.id}`}>
                    <Button size="sm" className="w-full rounded-lg font-bold">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Recent Test Attempts */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Recent Tests</h2>
              <Link to="/tests" className="text-sm text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{test.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{test.date}</p>
                    </div>
                    <div className={`text-sm font-bold px-3 py-1 rounded-lg ${
                      test.percentage >= 80
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : test.percentage >= 60
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {test.percentage}%
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Score: {test.score}/{test.total}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {test.percentage >= 80 ? 'Excellent' : test.percentage >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Live Classes */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Upcoming Live Classes</h2>
              <Link to="/live" className="text-sm text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {liveClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Play className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{cls.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{cls.instructor}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-brand-600 font-bold">{cls.time}</span>
                      </div>
                    </div>
                    <Link to={`/live/${cls.id}`}>
                      <Button size="sm" variant="secondary" className="rounded-lg text-xs">
                        Join
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
