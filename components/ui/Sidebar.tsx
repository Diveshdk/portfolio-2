'use client';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/data";
import { HiMenuAlt2 } from "react-icons/hi";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0A0A1B] border border-white/10 hover:bg-[#1A1A2E] transition-colors"
      >
        <HiMenuAlt2 className="w-6 h-6 text-white" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0.25 }}
            className="fixed left-0 top-0 h-screen w-64 bg-[#0A0A1B] border-r border-white/10 z-50"
          >
            <div className="flex flex-col p-6 pt-20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg mb-2 transition-colors ${
                    pathname === item.link
                      ? "bg-[#8B5CF6] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 