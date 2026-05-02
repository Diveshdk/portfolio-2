import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ReachMeToggle } from './components/ReachMeToggle';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { CompetitionsPage } from './pages/CompetitionsPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetail } from './pages/BlogDetail';

// Admin
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// Public portfolio routes with Navbar/Footer
const PortfolioRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isAdmin]);

  return (
    <>
      <ScrollToTop />
      <Cursor />
      <Routes>
        {/* Admin routes — standalone, no portfolio chrome */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Portfolio routes — wrapped with Navbar, Footer, etc. */}
        <Route
          path="/*"
          element={
            <div ref={containerRef} className="relative bg-white selection:bg-neon-orange selection:text-white">
              <Navbar />
              <main>
                <PortfolioRoutes />
              </main>
              <Footer />
              <ReachMeToggle />
            </div>
          }
        />
      </Routes>
    </>
  );
}
