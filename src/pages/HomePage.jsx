import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CourseCard } from '../features/courses/components/CourseCard';
import {
  Atom, Stethoscope, Shield, Building2, BookOpen,
  Search, Play, Trophy, ArrowRight, Star, Users, Award,
  GraduationCap, Clock, Headphones, ChevronLeft,
  ChevronRight, Quote, MapPin, Phone, Navigation
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ExamCountdown } from '../components/ui/ExamCountdown';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ui/ScrollReveal';
import { getPopularCourses } from '../api/courseApi';
import { getActiveBanners } from '../api/bannerApi';

// Animated counter hook
const useCountUp = (end, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started, startOnView]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return { count, ref };
};

// Fallback data when API is unavailable
const FALLBACK_COURSES = [
  {
    id: 1,
    title: 'IIT JEE 2027 - Complete Physics + Chemistry + Maths',
    category: 'IIT JEE',
    rating: 4.9,
    price: 14999,
    originalPrice: 25000,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    tag: 'Live Batch',
    duration: '12 Months',
  },
  {
    id: 2,
    title: 'NEET 2027 - Biology + PCM Complete Course',
    category: 'NEET',
    rating: 4.8,
    price: 12999,
    originalPrice: 22000,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    tag: 'Bestseller',
    duration: '12 Months',
  },
  {
    id: 3,
    title: 'NDA Written Exam - Complete Preparation',
    category: 'NDA / Airforce',
    rating: 4.7,
    price: 7999,
    originalPrice: 14999,
    image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80',
    tag: 'Top Rated',
    duration: '8 Months',
  },
  {
    id: 4,
    title: 'SSC JE - Mechanical Engineering',
    category: 'SSC JE',
    rating: 4.9,
    price: 5999,
    originalPrice: 11999,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    tag: 'New Batch',
    duration: '6 Months',
  },
  {
    id: 5,
    title: 'Class 10 - Science & Maths Board Preparation',
    category: 'Board Exams',
    rating: 4.8,
    price: 3999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    tag: 'CBSE & ICSE',
    duration: '10 Months',
  },
  {
    id: 6,
    title: 'Class 12 - PCM / PCB Board + Competitive',
    category: 'Board + Competitive',
    rating: 4.7,
    price: 6999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    tag: 'Value Pack',
    duration: '10 Months',
  },
];

const FALLBACK_BANNERS = [
  {
    id: 1,
    title: 'IIT JEE & NEET 2027 Batch Starting Soon',
    subtitle: 'Expert faculty, proven results. Limited seats.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Enroll Now',
    ctaLink: '/courses',
  },
  {
    id: 2,
    title: 'Free Mock Test for JEE & NEET Aspirants',
    subtitle: 'Practice with real exam pattern questions.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Start Free Test',
    ctaLink: '/tests',
  },
  {
    id: 3,
    title: 'NDA & SSC JE Special Batches',
    subtitle: 'Defence & Engineering competitive exam preparation.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Join Now',
    ctaLink: '/courses',
  },
];

const TESTIMONIALS = [
  {
    name: 'Rahul Verma',
    exam: 'IIT JEE Advanced - AIR 156',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    text: 'Antriksh Institute gave me the perfect foundation for JEE. The Physics and Maths faculty are outstanding, and their problem-solving approach helped me crack JEE Advanced.',
    rating: 5,
  },
  {
    name: 'Ananya Gupta',
    exam: 'NEET 2025 - Score 695/720',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    text: 'AIS is the best coaching in Meerut for NEET preparation. The Biology and Chemistry faculty explained every concept so clearly that I secured admission in a top medical college.',
    rating: 5,
  },
  {
    name: 'Amit Yadav',
    exam: 'NDA - Selected in First Attempt',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    text: 'The NDA batch at Antriksh Institute was exactly what I needed. The written exam coaching combined with SSB guidance helped me get selected in my very first attempt.',
    rating: 5,
  },
];

const CATEGORIES = [
  { icon: Atom, title: 'IIT JEE', color: 'from-blue-500 to-indigo-600', count: 'Mains & Advanced' },
  { icon: Stethoscope, title: 'NEET', color: 'from-green-500 to-emerald-600', count: 'Biology + PCM' },
  { icon: Shield, title: 'NDA / Airforce', color: 'from-amber-500 to-orange-600', count: 'Defence Exams' },
  { icon: Building2, title: 'SSC JE', color: 'from-purple-500 to-violet-600', count: 'ME / CE / EE' },
  { icon: BookOpen, title: 'Classes 9-10', color: 'from-cyan-500 to-teal-600', count: 'CBSE & ICSE' },
  { icon: GraduationCap, title: 'Classes 11-12', color: 'from-rose-500 to-red-600', count: 'PCM / PCB' },
];

const WHY_CHOOSE = [
  {
    icon: GraduationCap,
    title: 'Experienced Faculty',
    desc: 'Learn from subject experts with years of teaching experience. Our faculty are specialists in IIT JEE, NEET, and competitive exams.',
  },
  {
    icon: Users,
    title: 'Small Batch Sizes',
    desc: 'Personal attention for every student with limited batch sizes. No overcrowded classrooms, ensuring better learning outcomes.',
  },
  {
    icon: Trophy,
    title: 'Proven Track Record',
    desc: '15+ years of consistent results. Our students regularly crack IIT JEE, NEET, NDA, and other competitive exams.',
  },
  {
    icon: Shield,
    title: 'ISO 9001-2015 Certified',
    desc: 'Quality-assured coaching with standardized processes. Trusted by thousands of families in Meerut and nearby regions.',
  },
  {
    icon: Headphones,
    title: 'Personal Doubt Sessions',
    desc: 'Dedicated doubt-clearing sessions after every class. One-on-one attention until every concept is crystal clear.',
  },
  {
    icon: Award,
    title: 'Comprehensive Study Material',
    desc: 'In-house printed notes, test series, previous year papers, and regular mock tests - all included with the course.',
  },
];

export const HomePage = () => {
  const [courses, setCourses] = useState(FALLBACK_COURSES);
  const [banners, setBanners] = useState(FALLBACK_BANNERS);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [bannerPaused, setBannerPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getPopularCourses();
        if (res.data && res.data.length > 0) setCourses(res.data.slice(0, 6));
      } catch {
        // Use fallback data
      }
    };
    const fetchBanners = async () => {
      try {
        const res = await getActiveBanners();
        if (res.data && res.data.length > 0) setBanners(res.data);
      } catch {
        // Use fallback data
      }
    };
    fetchCourses();
    fetchBanners();
  }, []);

  // Auto-rotate banners (pause on hover)
  useEffect(() => {
    if (bannerPaused) return;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length, bannerPaused]);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const stats1 = useCountUp(10, 2000);
  const stats2 = useCountUp(50, 2000);
  const stats3 = useCountUp(15, 2000);
  const stats4 = useCountUp(95, 2000);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-600/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/80 font-medium">ISO 9001-2015 Certified Institute</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-white leading-tight mb-6">
            Meerut's Most Trusted Science Coaching <br />
            <span className="bg-gradient-to-r from-brand-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
              A.I.S. Meerut
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether it's <span className="font-bold text-white">IIT JEE</span>, <span className="font-bold text-white">NEET</span>,
            <span className="font-bold text-white"> NDA</span> or <span className="font-bold text-white">SSC JE</span> -
            achieve your dreams with expert faculty at Antriksh Institute of Science.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, exams, subjects..."
                className="w-full pl-12 pr-32 py-4 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-0 shadow-2xl shadow-black/20 focus:outline-none focus:ring-4 focus:ring-brand-500/30 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-900 hover:bg-brand-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Hero Stats */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {[
              { label: 'Students', value: '10K+', icon: Users },
              { label: 'Courses', value: '50+', icon: BookOpen },
              { label: 'Years Experience', value: '15+', icon: Clock },
              { label: 'Success Rate', value: '95%', icon: Trophy },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-brand-300" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXAM COUNTDOWN ===== */}
      <ExamCountdown />

      {/* ===== BANNER CAROUSEL ===== */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 shadow-xl"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured announcements"
            onMouseEnter={() => setBannerPaused(true)}
            onMouseLeave={() => setBannerPaused(false)}
          >
            {banners.map((banner, idx) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  idx === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 sm:px-12 lg:px-16 max-w-xl">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-3 leading-tight">
                      {banner.title}
                    </h2>
                    <p className="text-white/80 text-sm sm:text-base mb-6">{banner.subtitle}</p>
                    <Link to={banner.ctaLink}>
                      <Button size="md" className="rounded-lg">
                        {banner.ctaText} <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Banner controls */}
            <button
              onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Banner dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentBanner ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXAM CATEGORIES ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
              Explore by <span className="text-brand-600">Exam Category</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Choose your goal. We have courses for every major competitive exam in India.
            </p>
          </div>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {CATEGORIES.map((cat) => (
              <StaggerItem key={cat.title}>
                <Link
                  to={`/courses?category=${encodeURIComponent(cat.title)}`}
                  className="group bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <cat.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-bold text-gray-800 dark:text-gray-200 text-sm text-center">{cat.title}</span>
                  <span className="text-xs text-gray-400 mt-1">{cat.count}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== POPULAR / TRENDING COURSES ===== */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white">
                  Trending <span className="text-brand-600">Courses</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Most popular courses loved by thousands of students</p>
              </div>
              <Link to="/courses">
                <Button variant="ghost" className="hidden sm:flex">
                  View All Courses <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link to="/courses">
              <Button variant="secondary" size="md">
                View All Courses <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
              Why Choose <span className="text-brand-600">A.I.S.?</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              A Coaching Institute of Science and Technology, trusted by Meerut since over 15 years.
            </p>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE.map((feature) => (
              <StaggerItem key={feature.title}>
                <div
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-900 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-brand-700 dark:text-brand-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 px-4 bg-brand-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
              Our Students, Our Pride
            </h2>
            <p className="text-brand-200 max-w-xl mx-auto">
              Hear from students who achieved their dreams with Antriksh Institute
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
                >
                  <Quote className="w-8 h-8 text-brand-300 mb-4" />
                  <p className="text-white/90 text-sm leading-relaxed mb-6">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                    <div>
                      <p className="text-white font-bold text-sm">{testimonial.name}</p>
                      <p className="text-brand-200 text-xs">{testimonial.exam}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS COUNTER ===== */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900/50">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { ref: stats1.ref, count: stats1.count, suffix: 'K+', label: 'Students Taught', icon: Users },
                { ref: stats2.ref, count: stats2.count, suffix: '+', label: 'Expert Courses', icon: BookOpen },
                { ref: stats3.ref, count: stats3.count, suffix: '+ Yrs', label: 'Experience', icon: Clock },
                { ref: stats4.ref, count: stats4.count, suffix: '%', label: 'Success Rate', icon: Trophy },
              ].map((stat) => (
                <div key={stat.label} ref={stat.ref} className="text-center group">
                  <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-brand-600" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-heading font-extrabold text-gray-900 dark:text-white">
                    {stat.count}
                    <span className="text-brand-600">{stat.suffix}</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-4">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                  Start Your Preparation Today
                </h2>
                <p className="text-white/70 max-w-lg mx-auto mb-8 text-sm sm:text-base">
                  Join thousands of students already preparing with Meerut's most trusted coaching institute.
                  Your dream is just one step away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/courses">
                    <Button size="lg" className="bg-white text-brand-900 hover:bg-gray-100 rounded-xl shadow-xl shadow-black/20 font-bold">
                      Explore Courses <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl font-bold">
                      Sign Up Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== VISIT OUR CENTER ===== */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <ScrollReveal direction="left" className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 rounded-full px-4 py-2 text-sm font-bold mb-6">
                <MapPin className="w-4 h-4" />
                Visit Our Center
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Antriksh Institute of Science
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                A Coaching Institute of Science and Technology. Visit us for a free counselling session
                and campus tour. We are conveniently located on Baghpat Road, Meerut.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Kanha Plaza, Baghpat Road, Meerut, UP 250002</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Contact us for admissions and enquiries</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919410878922" className="flex items-center gap-3 bg-brand-900 text-white px-6 py-3 rounded-xl hover:bg-brand-800 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold text-sm">+91 94108 78922</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Kanha+Plaza+Baghpat+Road+Meerut+UP+250002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Navigation className="w-5 h-5" />
                  <span className="font-bold text-sm">Get Directions</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-80 sm:w-72 sm:h-96 bg-gradient-to-br from-brand-900 to-brand-950 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <img src="/ais-logo.jpg" alt="A.I.S. Logo" className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-white/20" />
                    <p className="font-heading font-bold text-2xl mb-2">A.I.S.</p>
                    <p className="text-sm text-white/60">Antriksh Institute of Science</p>
                    <div className="mt-4 text-xs text-white/50">ISO 9001-2015 Certified</div>
                    <div className="mt-6 flex items-center justify-center gap-2 bg-white/10 rounded-full px-4 py-2">
                      <MapPin className="w-4 h-4 text-brand-300" />
                      <span className="text-xs text-white/80">Meerut, UP</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 rotate-12">
                  <Star className="w-10 h-10 text-white fill-current" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
