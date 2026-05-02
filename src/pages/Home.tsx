import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Competitions } from '../components/Competitions';
import { Blog } from '../components/Blog';
import { Contact } from '../components/Contact';
import { PageTransition } from '../components/PageTransition';

export const Home: React.FC = () => {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Competitions />
      <Blog />
      <Contact />
    </PageTransition>
  );
};
