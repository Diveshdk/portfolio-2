import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const menuLinks = [
  { name: 'About me', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Competitions', href: '/competitions' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Connect', href: '/#contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#') && location.pathname === '/') {
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-10 flex justify-between items-center mix-blend-difference">
        <Link to="/" className="font-display text-2xl font-bold tracking-tighter text-white" onClick={() => setIsOpen(false)}>
          D.K
        </Link>
        
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-transform group"
          data-hover="true"
        >
          {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white group-hover:rotate-90 transition-transform" />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-deep-black flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col gap-4 text-center mb-16">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: i * 0.1 }
                  }}
                  className="group relative inline-block"
                >
                  <Link
                    to={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="group relative inline-block"
                    data-hover="true"
                  >
                    <motion.span 
                      whileTap={{ scale: 0.95, x: 10 }}
                      className="font-display text-5xl md:text-8xl font-black uppercase tracking-tight transition-all duration-300 group-hover:italic group-hover:translate-x-8 group-hover:text-neon-orange block text-white"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Links in Menu */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
              className="flex gap-8 pt-8 border-t border-white/10"
            >
              {[
                { name: 'GITHUB', href: 'https://github.com/Diveshdk' },
                { name: 'LINKEDIN', href: 'https://linkedin.com/in/divesh-kankani' },
                { name: 'TWITTER', href: 'https://x.com/sastelog' },
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-white/40 hover:text-neon-orange transition-colors"
                  data-hover="true"
                >
                  {social.name}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
