"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextGenerateEffect = ({ words }: { words: string }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let interval: NodeJS.Timeout;

    if (isTyping) {
      interval = setInterval(() => {
        if (currentIndex <= words.length) {
          setText(words.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
        }
      }, 50);
    }

    return () => clearInterval(interval);
  }, [words, isTyping]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
      {isTyping && <span className="animate-pulse">|</span>}
    </motion.span>
  );
};
