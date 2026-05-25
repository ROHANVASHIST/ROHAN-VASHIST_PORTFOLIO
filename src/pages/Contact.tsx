import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import InteractiveBookingEstimator from '../components/InteractiveBookingEstimator';

// Configuration for extra fields - easy to add more!
const EXTRA_FIELDS = [
  // Example: { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000', required: false },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Inquiry', required: true },
];

export default function Contact() {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    email: '',
    message: '',
    ...Object.fromEntries(EXTRA_FIELDS.map(f => [f.id, '']))
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
          ...Object.fromEntries(EXTRA_FIELDS.map(f => [f.id, '']))
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Let's Connect</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">Email</h3>
            <p className="text-gray-900 dark:text-gray-100 font-medium">rohanvashist01@gmail.com</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">GitHub</a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Twitter</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                />
              </div>
            </div>

            {/* Dynamic Extra Fields */}
            {EXTRA_FIELDS.map(field => (
              <div key={field.id} className="space-y-2">
                <label htmlFor={field.id} className="text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
                <input
                  required={field.required}
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                />
              </div>
            ))}

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                required
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-gray-400 dark:text-white resize-none"
              />
            </div>

            <button
              disabled={status === 'submitting' || status === 'success'}
              type="submit"
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                status === 'success' 
                  ? 'bg-green-600 text-white cursor-default' 
                  : 'bg-cyan-600 text-white hover:bg-cyan-700 active:scale-[0.98]'
              } disabled:opacity-70`}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Sent Successfully</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-100"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      {/* Interactive Estimator & Booking Scheduler */}
      <div className="mt-24 pt-16 border-t border-gray-100 dark:border-white/5 max-w-6xl mx-auto">
        <InteractiveBookingEstimator />
      </div>
    </main>
  );
}

