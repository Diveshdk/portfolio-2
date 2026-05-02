import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'DarkLord';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Access denied. Invalid credentials.');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4D00]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md relative ${shaking ? 'animate-shake' : ''}`}
      >
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#FF4D00]/30 bg-[#FF4D00]/10 mb-4">
            <Lock size={24} className="text-[#FF4D00]" />
          </div>
          <h1 className="font-mono text-2xl font-black uppercase tracking-[0.3em] text-white">
            Admin Access
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">
            Restricted zone — authorized personnel only
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white/[0.03] border border-white/10 p-8 relative">
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4D00]/50 to-transparent" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold block">
                Auth.credential
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="ENTER PASSPHRASE"
                  autoComplete="current-password"
                  className="w-full bg-white/5 border border-white/10 px-4 py-4 pr-12 font-mono text-sm text-white placeholder:text-white/10 focus:border-[#FF4D00]/50 focus:outline-none transition-all tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-red-400"
                >
                  <AlertCircle size={12} /> {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#FF4D00] text-white font-mono text-sm font-black uppercase tracking-[0.3em] hover:bg-[#FF4D00]/80 transition-colors"
            >
              Initialize Session
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/10 text-center">
              Session expires on browser close
            </p>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.6s ease-in-out; }
      `}</style>
    </div>
  );
};
