import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Twitter, Send, Code2, Cpu, CheckCircle, AlertCircle } from 'lucide-react';
import { Section } from './Section';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'wsFJaKn990mfmKcXZ';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_iqeux5m';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_tdp98zh';

const socialLinks = [
  { href: "https://github.com/Diveshdk", Icon: Github, label: "GitHub", hoverColor: "hover:bg-deep-black hover:text-white", rotate: "hover:-rotate-12" },
  { href: "https://linkedin.com/in/divesh-kankani", Icon: Linkedin, label: "LinkedIn", hoverColor: "hover:bg-royal-blue hover:text-white", rotate: "hover:rotate-12" },
  { href: "https://x.com/sastelog", Icon: Twitter, label: "Twitter", hoverColor: "hover:bg-sky-500 hover:text-white", rotate: "hover:-rotate-12" },
  { href: "https://t.me/divesh_dk12", Icon: Send, label: "Telegram", hoverColor: "hover:bg-sky-400 hover:text-white", rotate: "hover:rotate-12" },
  { href: "https://leetcode.com/u/Diveshdk07/", Icon: Code2, label: "LeetCode", hoverColor: "hover:bg-orange-500 hover:text-white", rotate: "hover:-rotate-12" },
  { href: "https://devfolio.co/@diveshdk07", Icon: Cpu, label: "Devfolio", hoverColor: "hover:bg-indigo-600 hover:text-white", rotate: "hover:rotate-12" },
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <Section id="contact" backgroundColor="bg-white" textColor="text-deep-black" className="py-32 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-16">
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-deep-black/40 font-bold">06 / Connect</span>
              <h2 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-deep-black">
                Let's Build
              </h2>
            </div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-deep-black/60 max-w-sm">
              Initiating collaborative protocols for high-stakes digital environments.
            </p>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <div className="group">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-deep-black/30 font-bold block mb-2">Direct Intel</span>
                <a 
                  href="mailto:kankanifivesh6@gmail.com" 
                  className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight hover:text-neon-orange transition-colors underline decoration-deep-black/10 underline-offset-8 decoration-2"
                  data-hover="true"
                >
                  kankanifivesh6@gmail.com
                </a>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                {socialLinks.map(({ href, Icon, label, hoverColor, rotate }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 border-2 border-deep-black flex items-center justify-center transition-all transform ${hoverColor} ${rotate}`}
                    data-hover="true"
                    title={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-deep-black/40">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Usually replies within 24 hours
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-deep-black/[0.02] border-2 border-deep-black p-8 md:p-12 relative group"
          >
            {/* Decorative Corner */}
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-neon-orange pointer-events-none" />
            
            <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-deep-black/40 font-bold">Identifer.name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
                    placeholder="YOUR IDENTITY" 
                    className="w-full bg-transparent border-b-2 border-deep-black/10 py-4 font-display text-lg uppercase tracking-tight focus:border-neon-orange outline-none transition-all placeholder:text-deep-black/10"
                  />
                  {errors.name && <p className="text-red-500 font-mono text-[10px] flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-deep-black/40 font-bold">Protocol.email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }); }}
                    placeholder="YOUR_DATA@MAIL.COM" 
                    className="w-full bg-transparent border-b-2 border-deep-black/10 py-4 font-display text-lg uppercase tracking-tight focus:border-neon-orange outline-none transition-all placeholder:text-deep-black/10"
                  />
                  {errors.email && <p className="text-red-500 font-mono text-[10px] flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-deep-black/40 font-bold">Transmission.payload</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => { setFormData({ ...formData, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: '' }); }}
                  placeholder="DESCRIBE THE MISSION..."
                  className="w-full bg-transparent border-b-2 border-deep-black/10 py-4 font-display text-lg uppercase tracking-tight focus:border-neon-orange outline-none transition-all resize-none placeholder:text-deep-black/10"
                />
                {errors.message && <p className="text-red-500 font-mono text-[10px] flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>}
              </div>

              <motion.button 
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                className="w-full md:w-auto px-12 py-6 bg-deep-black text-white font-display text-xl font-black uppercase tracking-tighter hover:bg-neon-orange transition-colors relative overflow-hidden group/btn disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {status === 'sending' ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Transmitting...</>
                  ) : 'Initiate Contact'}
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 opacity-10" />
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 border-2 border-green-500/30 bg-green-500/5 text-green-700"
                  >
                    <CheckCircle size={18} />
                    <p className="font-mono text-xs uppercase tracking-widest font-bold">Transmission successful! I'll respond within 24 hours.</p>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 border-2 border-red-500/30 bg-red-500/5 text-red-700"
                  >
                    <AlertCircle size={18} />
                    <p className="font-mono text-xs uppercase tracking-widest font-bold">Transmission failed. Try again or email directly.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

      </div>
    </Section>
  );
};
