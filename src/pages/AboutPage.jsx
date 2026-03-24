import React from 'react';
import {
  Target, Eye, Heart, Lightbulb, Users, BookOpen, Award, Trophy,
  GraduationCap, Star, ArrowRight, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const TEAM = [
  {
    name: 'Mr. Rajesh Sharma',
    role: 'Director & Physics HOD',
    bio: 'M.Sc. Physics with 15+ years of experience in IIT JEE & NEET coaching. Founder of A.I.S. Meerut.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dr. Neha Gupta',
    role: 'Chemistry Expert',
    bio: 'PhD in Chemistry. Specializes in Organic & Inorganic Chemistry for JEE and NEET aspirants.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Mr. Vikram Singh',
    role: 'Maths Faculty',
    bio: 'B.Tech IIT Roorkee. Expert in IIT JEE Mathematics with a track record of top selections.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dr. Priya Verma',
    role: 'Biology Faculty',
    bio: 'MBBS, passionate educator. Helped 3000+ students crack NEET with her simplified teaching style.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
  },
];

const VALUES = [
  {
    icon: Target,
    title: 'Mission-Driven',
    desc: 'Our mission is to provide world-class coaching for competitive exams like IIT JEE, NEET, NDA, and SSC JE, along with strong board exam preparation for Classes 6th-12th.',
  },
  {
    icon: Heart,
    title: 'Student First',
    desc: 'Every student at A.I.S. receives personalized attention, regular assessments, and continuous mentorship to ensure they reach their full potential.',
  },
  {
    icon: Lightbulb,
    title: 'Result-Oriented',
    desc: 'Our proven teaching methodology, comprehensive study material, and rigorous test series have consistently delivered 95%+ results across all courses.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    desc: 'No hidden fees, no misleading promises. We believe in honest pricing, genuine results, and clear communication with students and parents.',
  },
];

const ACHIEVEMENTS = [
  { value: '10,000+', label: 'Students Trained', icon: Users },
  { value: '15+', label: 'Years of Excellence', icon: GraduationCap },
  { value: '50+', label: 'Courses Offered', icon: Trophy },
  { value: '95%', label: 'Result Rate', icon: Star },
];

export const AboutPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-brand-300" />
            <span className="text-sm text-white/80 font-medium">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Building India's Future, <br />
            <span className="bg-gradient-to-r from-brand-300 to-orange-300 bg-clip-text text-transparent">
              One Student at a Time
            </span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Antriksh Institute of Science (A.I.S.) was founded with a simple belief: every student in Meerut and nearby regions
            deserves access to the best coaching for competitive exams and board preparation.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Our <span className="text-brand-600">Story</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Antriksh Institute of Science (A.I.S.) is an ISO 9001-2015 certified coaching institute located at
                  Kanha Plaza, Baghpat Road, Meerut. We have been nurturing young minds and guiding students towards
                  academic excellence for over 15 years.
                </p>
                <p>
                  What started as a small coaching center has grown into one of Meerut's most trusted institutes for
                  competitive exam preparation. Our experienced faculty, proven teaching methods, and dedicated mentorship
                  have helped thousands of students achieve their dreams.
                </p>
                <p>
                  Today, A.I.S. offers comprehensive coaching for IIT JEE, NEET, NDA, Airforce, SSC JE, and
                  board exam preparation for Classes 6th through 12th. With 10,000+ students trained and a 95%+
                  result rate, we continue to set new benchmarks in quality education in the region.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Students learning"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-brand-900 text-white p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-heading font-extrabold">15+</p>
                <p className="text-brand-200 text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Stats */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {ACHIEVEMENTS.map((item) => (
              <div key={item.label} className="text-center group">
                <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-brand-600" />
                </div>
                <p className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white">{item.value}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Faculty */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
              Meet Our <span className="text-brand-600">Team</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              The experienced faculty at A.I.S. dedicated to shaping the future of students in Meerut.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white text-lg">{member.name}</h3>
                  <p className="text-brand-600 text-sm font-bold mb-2">{member.role}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
              Our <span className="text-brand-600">Values</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              The principles that guide us every day as we work to transform education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="w-14 h-14 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-900 transition-colors duration-300">
                  <value.icon className="w-7 h-7 text-brand-700 dark:text-brand-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 rounded-3xl p-10 sm:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                Ready to Join the A.I.S. Family?
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-8 text-sm sm:text-base">
                Start your preparation journey today with Meerut's most trusted coaching institute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses">
                  <Button size="lg" className="bg-white text-brand-900 hover:bg-gray-100 rounded-xl shadow-xl font-bold">
                    Explore Courses <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl font-bold">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
