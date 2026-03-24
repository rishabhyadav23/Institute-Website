import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { submitContactForm } from '../api/contactApi';

const FAQ_DATA = [
  {
    question: 'What are the batch timings at A.I.S.?',
    answer: 'We offer multiple batches throughout the day. Morning batches run from 6:30 AM to 10:00 AM, afternoon batches from 12:00 PM to 3:30 PM, and evening batches from 4:00 PM to 7:30 PM. Timings may vary by course.',
  },
  {
    question: 'What is the fee structure for different courses?',
    answer: 'Fee varies by course and duration. Please visit our institute at Kanha Plaza, Baghpat Road, Meerut or call us at +91 94108 78922 for detailed fee information. We also offer installment payment options.',
  },
  {
    question: 'Do you offer free demo classes?',
    answer: 'Yes, we offer free demo classes for all our courses. You can attend 2-3 classes before making a decision. Just visit our center or call us to schedule a demo session.',
  },
  {
    question: 'Is study material provided with the course?',
    answer: 'Yes, comprehensive study material including printed notes, practice sheets, previous year question papers, and regular test series are provided with every course at no extra cost.',
  },
  {
    question: 'What courses do you offer at A.I.S.?',
    answer: 'We offer coaching for IIT JEE (Mains & Advanced), NEET, NDA, Airforce, SSC JE, and board exam preparation for Classes 6th through 12th in all subjects including Physics, Chemistry, Mathematics, and Biology.',
  },
  {
    question: 'How can I track my child\'s progress?',
    answer: 'We conduct regular tests and assessments. Parents receive periodic progress reports and can also schedule meetings with faculty to discuss their child\'s performance. Our online portal also provides real-time test scores and attendance.',
  },
];

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(new Set([0]));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setError('Unable to send your message right now. Please call us at +91 94108 78922 or email ais123meerut@gmail.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setExpandedFaq((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base">
            Have questions? We'd love to hear from you. Our team is always ready to help you with any queries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
                  <Button onClick={() => setSubmitted(false)} variant="secondary" size="md">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 12345 67890"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="course">Course Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="payment">Payment Issue</option>
                        <option value="refund">Refund Request</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" size="lg" className="w-full sm:w-auto rounded-xl font-bold" isLoading={submitting}>
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Office Info */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-6">Our Office</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 dark:bg-brand-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Address</p>
                    <p className="text-sm text-gray-500">Kanha Plaza, Baghpat Road, Meerut, UP 250002</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 dark:bg-brand-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Phone</p>
                    <a href="tel:+919410878922" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">+91 94108 78922</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 dark:bg-brand-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Email</p>
                    <a href="mailto:ais123meerut@gmail.com" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">ais123meerut@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 dark:bg-brand-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Hours</p>
                    <p className="text-sm text-gray-500">Mon - Sat: 9AM - 8PM</p>
                    <p className="text-sm text-gray-500">Sun: 10AM - 5PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Meerut, Uttar Pradesh</p>
                  <a
                    href="https://maps.google.com/?q=Kanha+Plaza+Baghpat+Road+Meerut"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-600 hover:underline font-bold mt-1 inline-block"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Quick answers to common queries</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={expandedFaq.has(idx)}
                  aria-controls={`faq-${idx}`}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
                >
                  <span className="font-bold text-gray-900 dark:text-white text-sm pr-4">{faq.question}</span>
                  {expandedFaq.has(idx) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq.has(idx) && (
                  <div id={`faq-${idx}`} role="region" className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
