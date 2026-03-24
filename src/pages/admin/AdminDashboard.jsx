import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  ClipboardList,
  Video,
  MessageSquare,
  Plus,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { getDashboardStats, getContactMessages } from '../../api/adminApi';

const StatCard = ({ label, value, icon: Icon, color, onClick }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value ?? '--'}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, messagesRes] = await Promise.allSettled([
          getDashboardStats(),
          getContactMessages(),
        ]);

        if (statsRes.status === 'fulfilled') {
          const d = statsRes.value.data.data || statsRes.value.data;
          setStats(d);
        }

        if (messagesRes.status === 'fulfilled') {
          const d = messagesRes.value.data.data || messagesRes.value.data;
          const list = Array.isArray(d) ? d : d?.content || [];
          setMessages(list.slice(0, 5));
        }
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brand-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Overview of your coaching institute</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          label="Total Students"
          value={stats?.totalStudents ?? 0}
          icon={Users}
          color="blue"
          onClick={() => navigate('/admin/students')}
        />
        <StatCard
          label="Total Courses"
          value={stats?.totalCourses ?? 0}
          icon={BookOpen}
          color="green"
          onClick={() => navigate('/admin/courses')}
        />
        <StatCard
          label="Total Tests"
          value={stats?.totalTests ?? 0}
          icon={ClipboardList}
          color="purple"
          onClick={() => navigate('/admin/tests')}
        />
        <StatCard
          label="Live Classes"
          value={stats?.totalLiveClasses ?? 0}
          icon={Video}
          color="orange"
          onClick={() => navigate('/admin/live')}
        />
        <StatCard
          label="Unread Messages"
          value={stats?.unreadMessages ?? 0}
          icon={MessageSquare}
          color="red"
          onClick={() => navigate('/admin/messages')}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h2 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={() => navigate('/admin/courses')}>
            <Plus className="w-4 h-4" /> Add Course
          </Button>
          <Button size="sm" variant="secondary" onClick={() => navigate('/admin/tests')}>
            <Plus className="w-4 h-4" /> Add Test
          </Button>
          <Button size="sm" variant="secondary" onClick={() => navigate('/admin/live')}>
            <Plus className="w-4 h-4" /> Schedule Live Class
          </Button>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white">Recent Messages</h2>
          <button
            onClick={() => navigate('/admin/messages')}
            className="text-sm text-brand-900 hover:text-brand-800 font-medium flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {messages.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm py-4 text-center">No messages yet</p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {messages.map((msg, idx) => (
              <div key={msg.id || idx} className="py-3 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-semibold text-sm shrink-0">
                  {(msg.name || '?').charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{msg.name}</p>
                    {!msg.read && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{msg.subject || msg.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
