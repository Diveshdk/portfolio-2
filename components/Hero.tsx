'use client';
import { motion } from 'framer-motion';
import { Spotlight } from './ui/Spotlight';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaTelegram } from 'react-icons/fa';
import { SiLeetcode, SiDevpost } from 'react-icons/si';
import { HiArrowRight, HiArrowDown } from 'react-icons/hi2';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';

const socialLinks = [
  {
    href: "https://github.com/Diveshdk",
    icon: <FaGithub />,
    label: "GitHub"
  },
  {
    href: "https://linkedin.com/in/divesh-kankani",
    icon: <FaLinkedin />,
    label: "LinkedIn"
  },
  {
    href: "https://leetcode.com/u/Diveshdk07/", // Replace with your LeetCode profile
    icon: <SiLeetcode />,
    label: "LeetCode"
  },
  {
    href: "https://x.com/sastelog", // Replace with your Twitter profile
    icon: <FaTwitter />,
    label: "Twitter"
  },
  {
    href: "https://t.me/divesh_dk12", // Replace with your Telegram username
    icon: <FaTelegram />,
    label: "Telegram"
  },
  {
    href: "https://devfolio.co/@diveshdk07", // Replace with your Devfolio profile
    icon: <SiDevpost />,
    label: "Devfolio"
  }
];

const Hero = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-4">
        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 px-2"
        >
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl text-gray-400 hover:text-white transition-colors p-1.5 md:p-2 hover:bg-white/10 rounded-full"
              title={link.label}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>

        {/* Rest of the content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-xl text-purple font-medium tracking-wide">
            Hi there, I'm
          </h2>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Divesh Kankani
          </h1>

          <div className="text-2xl md:text-3xl text-gray-400 font-light">
            <TextGenerateEffect words="Full Stack Developer & Blockchain Enthusiast" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          I specialize in building exceptional digital experiences and blockchain solutions. 
          With expertise in both frontend and backend development, I create scalable 
          applications that solve real-world problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8 px-4"
        >
          <Link href="/projects" className="group w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3 bg-purple text-white rounded-lg flex items-center justify-center gap-2 hover:bg-purple/80 transition-all hover:gap-4">
              View My Work
              <HiArrowRight className="transition-all" />
            </button>
          </Link>
          <Link href="/tech-stack" className="group w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3 bg-transparent text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
              Tech Stack
            </button>
          </Link>
          <a 
            href="https://drive.google.com/file/d/15J34fGO_2giRHq7PhG2JA7P61GJ8xDkl/view?usp=drive_link"
            target="_blank"
            className="group w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-8 py-3 bg-[#8B5CF6] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#7C3AED] transition-colors">
              Resume
              <HiArrowDown className="transition-all group-hover:translate-y-1" />
            </button>
          </a>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-6 justify-center text-sm text-gray-400 mt-12"
        >
          <Link href="/experience" className="hover:text-white transition-colors">Experience</Link>
          <Link href="/hackathons" className="hover:text-white transition-colors">Hackathons</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
      </div>
    </div>
  );
};

export default Hero;
