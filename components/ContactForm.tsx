'use client';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

export const ContactForm = () => {
  useEffect(() => {
    emailjs.init("wsFJaKn990mfmKcXZ"); // Initialize with your public key
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email, // Add this to ensure reply-to is set
      };

      await emailjs.send(
        'service_iqeux5m',
        'template_tdp98zh',
        templateParams,
        'wsFJaKn990mfmKcXZ'
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full bg-[#010116]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            Get in <span className="text-[#8B5CF6]">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
          >
            Have a question or want to work together? Send me a message!
          </motion.p>
        </div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4 md:space-y-6 bg-[#0A0A1B] p-4 md:p-8 rounded-3xl"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#1A1A2E] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#1A1A2E] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-[#1A1A2E] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-8 py-4 bg-[#8B5CF6] text-white rounded-xl hover:bg-[#7C3AED] transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-green-500 text-center">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
          )}
        </motion.form>
      </div>
    </div>
  );
}; 