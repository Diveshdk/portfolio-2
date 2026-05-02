import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Twitter, Send, Code2, Cpu, X, SquareTerminal } from 'lucide-react';
import { cn } from '../lib/utils';

const socialLinks = [
  { name: 'Github', icon: Github, href: 'https://github.com/Diveshdk', color: 'hover:bg-white hover:text-black' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/divesh-kankani', color: 'hover:bg-blue-600 hover:text-white' },
  { name: 'LeetCode', icon: Code2, href: 'https://leetcode.com/u/Diveshdk07/', color: 'hover:bg-orange-500 hover:text-white' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/sastelog', color: 'hover:bg-sky-500 hover:text-white' },
  { name: 'Telegram', icon: Send, href: 'https://t.me/divesh_dk12', color: 'hover:bg-sky-400 hover:text-white' },
  { name: 'Devfolio', icon: Cpu, href: 'https://devfolio.co/@diveshdk07', color: 'hover:bg-indigo-600 hover:text-white' },
];

export const ReachMeToggle = () => {
  const [showSocials, setShowSocials] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSocials(true)}
        className="fixed bottom-8 right-8 z-[150] w-16 h-16 bg-white text-deep-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] md:bottom-12 md:right-12 group"
        data-hover="true"
      >
        <div className="absolute inset-0 bg-neon-orange translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
        <SquareTerminal size={24} className="relative z-10 group-hover:text-white transition-colors" />
        
        {/* Floating Label */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Reach Me
        </div>
      </motion.button>

      {/* SOCIALS OVERLAY */}
      <AnimatePresence>
        {showSocials && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-deep-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6"
          >
            <motion.button 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setShowSocials(false)}
              className="absolute top-10 right-10 p-4 border border-white/20 text-white hover:bg-neon-orange transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
              data-hover="true"
            >
              <span>Close</span>
              <X size={24} />
            </motion.button>

            <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { delay: i * 0.1, type: 'spring', stiffness: 200 }
                  }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={cn(
                    "relative aspect-square md:aspect-auto md:h-48 border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 md:gap-4 group transition-all duration-300",
                    social.color
                  )}
                  data-hover="true"
                >
                  <social.icon size={40} className="md:size-12 transition-transform group-hover:scale-110" />
                  <span className="font-display text-sm md:text-xl font-bold uppercase tracking-widest">{social.name}</span>
                  <div className="absolute top-2 right-2 font-mono text-[6px] md:text-[8px] opacity-20 group-hover:opacity-100 transition-opacity">
                    NODE_{i+1}
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 font-mono text-[8px] md:text-[10px] text-neon-orange uppercase tracking-[0.5em] animate-pulse flex flex-col items-center gap-2"
            >
              <div className="w-32 h-[1px] bg-white/10 mb-2" />
              <span>Establishing secure connection to web2.nodes...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
