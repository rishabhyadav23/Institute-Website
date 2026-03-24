import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { AnimatedOutlet } from './AnimatedOutlet';
import {
  Mail, Phone, MapPin, Send,
  Facebook, Instagram, Youtube,
  BookOpen, GraduationCap, FileText, Video, FlaskConical, Scale
} from 'lucide-react';
import { subscribeNewsletter } from '../../api/contactApi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 border-t border-gray-800">
      {/* Newsletter Strip */}
      <div className="bg-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-heading font-bold text-lg">Stay Updated</h3>
              <p className="text-brand-200 text-sm">Get latest courses, offers & exam tips in your inbox</p>
            </div>
          </div>
          <form onSubmit={handleNewsletter} className="flex w-full md:w-auto gap-2">
            {subscribed ? (
              <p className="text-white font-semibold py-2">Thank you for subscribing!</p>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 w-full md:w-72 text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="bg-white text-brand-900 px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <img src="/ais-logo.jpg" alt="A.I.S. Logo" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col -space-y-1">
                <span className="text-xl font-heading font-extrabold text-white tracking-tight">
                  Antriksh<span className="text-brand-400 italic"> Institute</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Antriksh Institute of Science (A.I.S.) is an ISO 9001-2015 certified coaching institute in Meerut. Providing quality education for IIT JEE, NEET, NDA, SSC JE, and Classes 6th-12th since establishment.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/aismeerut/' },
                { icon: Instagram, href: 'https://www.instagram.com/aismeerut/' },
                { icon: Youtube, href: 'https://www.youtube.com/@aismeerut' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-brand-900 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Courses', path: '/courses' },
                { name: 'Test Series', path: '/tests' },
                { name: 'Study Material', path: '/notes' },
                { name: 'Live Classes', path: '/live' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Exam Categories */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Exam Categories</h4>
            <ul className="space-y-3">
              {[
                { icon: FlaskConical, name: 'IIT JEE' },
                { icon: BookOpen, name: 'NEET' },
                { icon: GraduationCap, name: 'NDA/Airforce' },
                { icon: FileText, name: 'SSC JE' },
                { icon: Video, name: 'Classes 9-10' },
                { icon: Scale, name: 'Classes 11-12' },
              ].map(({ icon: Icon, name }) => (
                <li key={name}>
                  <Link
                    to={`/courses?category=${encodeURIComponent(name)}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Kanha Plaza, Baghpat Road,
                  Meerut, UP 250002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-400 flex-shrink-0" />
                <a href="tel:+919410878922" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +91 94108 78922
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-400 flex-shrink-0" />
                <a href="mailto:ais123meerut@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  ais123meerut@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-400">
                <span className="font-bold text-white block mb-1">Support Hours</span>
                Mon - Sat: 9:00 AM - 8:00 PM<br />
                Sunday: 10:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 Antriksh Institute of Science. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/contact" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const MainLayout = () => {
  return (
    <div className="font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <AnimatedOutlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};
