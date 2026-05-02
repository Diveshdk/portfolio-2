import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  fullWidth?: boolean;
}

export const Section = ({ 
  id, 
  children, 
  className, 
  backgroundColor = 'bg-deep-black',
  textColor = 'text-white',
  fullWidth = false
}: SectionProps) => {
  return (
    <section 
      id={id}
      className={cn(
        "min-h-screen w-full flex flex-col justify-center relative overflow-hidden",
        backgroundColor,
        textColor,
        !fullWidth && "p-6 md:p-12 lg:p-24",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};
