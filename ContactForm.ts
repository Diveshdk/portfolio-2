'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Confetti from 'react-confetti';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const ContactForm = () => {
  useEffect(() => {
    emailjs.init("wsFJaKn990mfmKcXZ");
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus('sending');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(
        'service_iqeux5m',
        'template_tdp98zh',
        templateParams,
        'wsFJaKn990mfmKcXZ'
      );

      setStatus('success');
      setShowConfetti(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setShowConfetti(false);
        setStatus('');
      }, 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-black/40 to-purple/5 p-6 overflow-auto">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Get in <span className="text-purple">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-base md:text-lg"
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
          className="space-y-6 bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl"
        >
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/80">Name</Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className="bg-white/5 border-white/10 text-white focus:border-purple"
              placeholder="Your name"
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className="bg-white/5 border-white/10 text-white focus:border-purple"
              placeholder="your.email@example.com"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white/80">Message</Label>
            <textarea
              id="message"
              rows={6}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: '' });
              }}
              className="flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/50"
              placeholder="Your message here..."
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple to-purple/80 text-white rounded-xl font-medium
                     hover:from-purple/90 hover:to-purple/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2 shadow-lg shadow-purple/20"
          >
            {status === 'sending' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </motion.button>

          {/* Status Messages */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400"
              >
                <CheckCircle className="w-5 h-5" />
                <p>Message sent successfully! I'll get back to you soon.</p>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400"
              >
                <AlertCircle className="w-5 h-5" />
                <p>Failed to send message. Please try again.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </div>
  );
};
 