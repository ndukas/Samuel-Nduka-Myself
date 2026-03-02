"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => {
      if (!isExiting) {
        handleAnimationComplete();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isExiting, onComplete]);

  const handleAnimationComplete = () => {
    // Small delay after drawing finishes before starting exit animation
    setTimeout(() => {
      setIsExiting(true);
      // Wait for exit animation to finish before calling onComplete
      setTimeout(onComplete, 800);
    }, 500);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05070A]"
        >
          <div className="relative flex flex-col items-center">
            <AppleHelloEnglishEffect 
              speed={1.5} 
              className="h-24 md:h-32 text-white" 
              onAnimationComplete={handleAnimationComplete}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
