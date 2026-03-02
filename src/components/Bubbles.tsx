import { motion } from "motion/react";

export default function Bubbles() {
  const bubbles = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50 + "%"],
            x: [null, (Math.random() - 0.5) * 50 + "%"],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute w-12 h-12 bg-blue-500/20 rounded-full blur-xl"
        />
      ))}
    </div>
  );
}
