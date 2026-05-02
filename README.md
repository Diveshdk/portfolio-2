# Divesh Kankani | Developer Portfolio 007

A brutalist, high-performance portfolio built with **React 19**, **Vite**, **Tailwind CSS**, and **Supabase**.

## 🚀 Features
- **Dynamic Content**: Fully connected to Supabase for Projects, Competitions, and Blogs.
- **Admin Panel**: Secure dashboard at `/admin` for CRUD operations on all site data.
- **Brutalist Design**: High-contrast, typography-focused aesthetic with custom kinetic animations.
- **Smooth Interaction**: Integrated Lenis smooth scrolling and custom cursor trail.
- **Responsive HUD**: Real-time technical HUD in the hero section.
- **Secure Contact**: Wired with EmailJS for direct communication.

## 🛠 Tech Stack
- **Frontend**: React 19, Motion (Framer Motion 12), Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Utilities**: Lucide Icons, Lenis Scroll, EmailJS
- **Tools**: Vite, TypeScript

## 🔧 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Diveshdk/portfolio-2.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file with your Supabase and EmailJS credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_EMAILJS_PUBLIC_KEY=your_key
   VITE_EMAILJS_SERVICE_ID=your_service
   VITE_EMAILJS_TEMPLATE_ID=your_template
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🔐 Admin Access
The admin panel is located at `/admin/login`. 
Password: `DarkLord` (as configured)

---
Developed with Brutalist Intent by Divesh Kankani.
