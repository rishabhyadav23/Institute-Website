import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star, Clock, Users, BookOpen, Play, Award, ChevronDown,
  ChevronUp, CheckCircle, Share2, Heart, ArrowLeft, Monitor,
  FileText, Download, Globe, Shield, Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CourseCard } from '../../features/courses/components/CourseCard';
import { getCourseById, getCourseReviews, enrollInCourse } from '../../api/courseApi';

const FALLBACK_COURSE = {
  id: 1,
  title: 'IIT JEE 2027 - Complete PCM Course (Live Batch)',
  category: 'IIT JEE',
  instructor: { name: 'Mr. Rajesh Sharma', bio: 'M.Sc. Physics with 15+ years of IIT JEE coaching experience', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  rating: 4.9,
  ratingCount: 2340,
  students: 2500,
  price: 14999,
  originalPrice: 25000,
  image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
  tag: 'Live Batch',
  duration: '12 Months',
  language: 'Hindi & English',
  lastUpdated: 'March 2026',
  description: 'A comprehensive course for IIT JEE Mains & Advanced aspirants covering complete Physics, Chemistry, and Mathematics syllabus. Live classes with expert faculty, doubt sessions, and regular mock tests ensure you are fully prepared. Study material and test series included.',
  highlights: ['400+ Hours of Live Classes', '2000+ Practice Questions', 'Complete PCM Syllabus Coverage', 'Weekly Mock Tests', 'Doubt Clearing Sessions', 'Previous Year Papers', 'Personal Mentorship', 'Downloadable PDF Notes'],
  syllabus: [
    { title: 'Physics - Mechanics & Thermodynamics', lessons: 42, duration: '60 hours', topics: ['Kinematics', 'Laws of Motion', 'Work & Energy', 'Rotational Motion', 'Thermodynamics'] },
    { title: 'Physics - Electricity & Magnetism', lessons: 35, duration: '48 hours', topics: ['Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction', 'Alternating Current'] },
    { title: 'Chemistry - Physical Chemistry', lessons: 38, duration: '52 hours', topics: ['Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Thermochemistry', 'Electrochemistry'] },
    { title: 'Chemistry - Organic Chemistry', lessons: 30, duration: '45 hours', topics: ['Basic Concepts', 'Hydrocarbons', 'Reaction Mechanisms', 'Functional Groups', 'Biomolecules'] },
    { title: 'Mathematics - Calculus & Algebra', lessons: 40, duration: '56 hours', topics: ['Functions', 'Limits & Continuity', 'Differentiation', 'Integration', 'Differential Equations'] },
    { title: 'Mathematics - Coordinate Geometry', lessons: 28, duration: '40 hours', topics: ['Straight Lines', 'Circles', 'Parabola', 'Ellipse', 'Hyperbola'] },
  ],
};

const FALLBACK_REVIEWS = [
  { id: 1, user: 'Ravi K.', rating: 5, date: '2 weeks ago', text: 'Best UPSC course available online. Dr. Amit Sir explains complex topics with such ease. The study material is top-notch.' },
  { id: 2, user: 'Sneha M.', rating: 5, date: '1 month ago', text: 'I cleared Prelims in my first attempt because of this course. The mock tests and answer writing sessions are extremely helpful.' },
  { id: 3, user: 'Vikram S.', rating: 4, date: '1 month ago', text: 'Great content and teaching methodology. Would be even better with more optional subject coverage. Overall highly recommended.' },
];

const RELATED_COURSES = [
  { id: 2, title: 'IIT JEE Advanced - Physics Mastery', category: 'IIT JEE', rating: 4.8, price: 4999, originalPrice: 8999, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80', tag: 'Bestseller', duration: '8 Months' },
  { id: 3, title: 'NEET 2026 Biology Complete', category: 'NEET', rating: 4.9, price: 5999, originalPrice: 11999, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80', tag: 'Top Rated', duration: '10 Months' },
  { id: 4, title: 'GATE CS 2026 Preparation', category: 'GATE', rating: 4.7, price: 3999, originalPrice: 7999, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', tag: 'New Launch', duration: '6 Months' },
];

export const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSyllabus, setExpandedSyllabus] = useState(new Set([0]));
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await getCourseById(id);
        setCourse(res.data);
      } catch {
        setCourse(FALLBACK_COURSE);
      } finally {
        setLoading(false);
      }
    };
    const fetchReviews = async () => {
      try {
        const res = await getCourseReviews(id);
        if (res.data && res.data.length > 0) setReviews(res.data);
      } catch {
        // Use fallback
      }
    };
    fetchCourse();
    fetchReviews();
    window.scrollTo(0, 0);
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await enrollInCourse(id);
      alert('Enrolled successfully!');
    } catch {
      alert('Please log in to enroll.');
    } finally {
      setEnrolling(false);
    }
  };

  const toggleSyllabus = (idx) => {
    setExpandedSyllabus((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!course) return null;

  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const totalLessons = (course.syllabus || FALLBACK_COURSE.syllabus).reduce((sum, s) => sum + s.lessons, 0);
  const totalDuration = (course.syllabus || FALLBACK_COURSE.syllabus).reduce((sum, s) => sum + parseInt(s.duration), 0);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-20">
      {/* Course Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-brand-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <Link to="/courses" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {course.tag && (
                <span className="inline-block bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4">
                  {course.tag}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-white/70 mb-6 text-sm sm:text-base leading-relaxed max-w-2xl">
                {course.description || FALLBACK_COURSE.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-bold">{course.rating}</span>
                  <span className="text-white/50">({course.ratingCount || '2,300+'} ratings)</span>
                </div>
                <div className="flex items-center gap-1 text-white/70">
                  <Users className="w-4 h-4" />
                  <span>{course.students || '12,500'} students</span>
                </div>
                <div className="flex items-center gap-1 text-white/70">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-white/70">
                  <Globe className="w-4 h-4" />
                  <span>{course.language || 'Hindi & English'}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <img
                  src={course.instructor?.avatar || FALLBACK_COURSE.instructor.avatar}
                  alt="Instructor"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <p className="text-white font-bold text-sm">{course.instructor?.name || FALLBACK_COURSE.instructor.name}</p>
                  <p className="text-white/50 text-xs">{course.instructor?.bio || FALLBACK_COURSE.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={course.image || FALLBACK_COURSE.image}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-8 overflow-x-auto" role="tablist">
              {['overview', 'syllabus', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`panel-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-900 text-brand-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div role="tabpanel" id="panel-overview" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">About This Course</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {course.description || FALLBACK_COURSE.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">What You'll Get</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(course.highlights || FALLBACK_COURSE.highlights).map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: BookOpen, label: 'Lessons', value: totalLessons },
                    { icon: Clock, label: 'Duration', value: `${totalDuration}h` },
                    { icon: Monitor, label: 'Mode', value: 'Live + Recorded' },
                    { icon: FileText, label: 'Resources', value: 'PDF Notes' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 text-center">
                      <item.icon className="w-6 h-6 text-brand-600 mx-auto mb-2" />
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</p>
                      <p className="text-xs text-gray-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Syllabus Tab */}
            {activeTab === 'syllabus' && (
              <div role="tabpanel" id="panel-syllabus" className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Course Syllabus</h2>
                  <p className="text-sm text-gray-500">{totalLessons} lessons | {totalDuration} hours</p>
                </div>
                {(course.syllabus || FALLBACK_COURSE.syllabus).map((section, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSyllabus(idx)}
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-50 dark:bg-brand-900/20 rounded-lg flex items-center justify-center text-sm font-bold text-brand-700">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-gray-900 dark:text-white text-sm">{section.title}</p>
                          <p className="text-xs text-gray-500">{section.lessons} lessons | {section.duration}</p>
                        </div>
                      </div>
                      {expandedSyllabus.has(idx) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedSyllabus.has(idx) && (
                      <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800">
                        <ul className="space-y-2 pt-4">
                          {section.topics.map((topic, tidx) => (
                            <li key={tidx} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                              <Play className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div role="tabpanel" id="panel-reviews">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Student Reviews</h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center font-bold text-brand-700 dark:text-brand-400 text-sm">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{review.user}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Price */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
                      ₹{course.price?.toLocaleString()}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">₹{course.originalPrice?.toLocaleString()}</span>
                    )}
                  </div>
                  {discount > 0 && (
                    <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Enroll Button */}
                <div className="p-6 space-y-3">
                  <Button
                    size="lg"
                    className="w-full rounded-xl font-bold"
                    onClick={handleEnroll}
                    isLoading={enrolling}
                  >
                    Enroll Now
                  </Button>
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Heart className="w-4 h-4" /> Add to Wishlist
                  </button>
                </div>

                {/* Features List */}
                <div className="px-6 pb-6 space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">This course includes:</h4>
                  {[
                    { icon: Play, text: `${totalDuration}+ hours of content` },
                    { icon: BookOpen, text: `${totalLessons} comprehensive lessons` },
                    { icon: FileText, text: 'Downloadable PDF notes' },
                    { icon: Monitor, text: 'Live + Recorded classes' },
                    { icon: Download, text: 'Offline access' },
                    { icon: Award, text: 'Certificate of completion' },
                    { icon: Shield, text: 'Lifetime access' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <item.icon className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>

                {/* Share */}
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 transition-colors">
                    <Share2 className="w-4 h-4" /> Share this course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RELATED_COURSES.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
};
