import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Trophy, FileText, LogOut, ExternalLink, Menu, X,
} from 'lucide-react';
import { AdminProjects } from './sections/AdminProjects';
import { AdminCompetitions } from './sections/AdminCompetitions';
import { AdminBlogs } from './sections/AdminBlogs';

type Tab = 'projects' | 'competitions' | 'blogs';

const tabs: { id: Tab; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { id: 'projects', label: 'Projects', Icon: LayoutGrid },
  { id: 'competitions', label: 'Competitions', Icon: Trophy },
  { id: 'blogs', label: 'Blogs', Icon: FileText },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20">Portfolio</p>
          <h1 className="font-mono text-lg font-black uppercase tracking-widest text-white">Admin</h1>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-all ${
              activeTab === id
                ? 'bg-[#FF4D00] text-white'
                : 'text-white/30 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/20 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink size={14} /> View Site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut size={14} /> Log Out
        </button>
        <div className="px-4 pt-2">
          <p className="font-mono text-[8px] uppercase tracking-widest text-white/10">
            Session active
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-[#0a0a0a] border-r border-white/10 flex-shrink-0 fixed top-0 left-0 h-full z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 md:hidden"
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-56 bg-[#0a0a0a] border-r border-white/10 z-40 md:hidden flex flex-col"
            >
              <div className="absolute top-4 right-4">
                <button onClick={() => setSidebarOpen(false)} className="text-white/30 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-[#080808]/90 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-white/40 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">Content Management</p>
              <h2 className="font-mono text-sm font-black uppercase tracking-widest text-white">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">Live</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'projects' && <AdminProjects />}
              {activeTab === 'competitions' && <AdminCompetitions />}
              {activeTab === 'blogs' && <AdminBlogs />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
