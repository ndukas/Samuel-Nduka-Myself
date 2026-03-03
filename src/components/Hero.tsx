import { useRef, useState, useEffect, memo } from "react";
import { AnimatedText } from "@/components/ui/animated-shiny-text";
import Counter from "@/components/ui/counter";
import heroImage from "@/assets/hero-subject.webp";

const HeroStats = memo(({ isDark }: { isDark: boolean }) => (
  <div className="flex flex-col gap-8 lg:gap-14">
    {[
      { value: 3, suffix: "+", label: "YEARS OF EXPERIENCE", decimals: 0 },
      { value: 25, suffix: "+", label: "PROJECTS", decimals: 0 },
      { value: 4.8, suffix: "", label: "RATING", decimals: 1 }
    ].map((stat, i) => (
      <div key={i} className="group flex flex-col items-end">
        <Counter
          value={stat.value}
          suffix={stat.suffix}
          decimals={stat.decimals}
          shiny={true}
          isDark={isDark}
          stiffness={15}
          damping={25}
          className={`text-3xl lg:text-6xl font-black tracking-tighter leading-none ${isDark ? 'text-white' : 'text-black'}`}
        />
        <div className="mt-2 flex items-center justify-end opacity-40 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] lg:text-xs uppercase tracking-[0.2em] font-bold">{stat.label}</span>
        </div>
      </div>
    ))}
  </div>
));

export default function Hero({ isDark }: { isDark: boolean }) {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Designer", "Developer", "Problem Solver"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const gradientColors = isDark
    ? "linear-gradient(90deg, #1E3A8A, #60A5FA, #1E3A8A)"
    : "linear-gradient(90deg, #DBEAFE, #3B82F6, #DBEAFE)";

  const textSizeClass = "text-[16vw] md:text-[14vw] lg:text-[12vw] font-bold tracking-tighter";

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: isDark ? "#05070A" : "#ffffff" }}
    >
      {/* Huge Background Text */}
      <div className="absolute md:fixed inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden -translate-y-[25vh] md:-translate-y-[30vh] lg:-translate-y-[34vh] z-0 px-4">
        <div className="w-full text-center">
          <div className="w-full flex items-center justify-center">
            {words[wordIndex] === "Problem Solver" ? (
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="relative">
                  <AnimatedText
                    text="Problem"
                    gradientColors={gradientColors}
                    className="py-0"
                    textClassName={textSizeClass}
                  />
                  <div
                    style={{ transformOrigin: 0 }}
                    className={`absolute top-[55%] left-0 w-full h-[2px] md:h-[3px] ${isDark ? 'bg-white/70' : 'bg-black/50'}`}
                  />
                </div>
                <AnimatedText
                  text="Solver"
                  gradientColors={gradientColors}
                  className="py-0 md:ml-4"
                  textClassName={textSizeClass}
                />
              </div>
            ) : (
              <AnimatedText
                text={words[wordIndex]}
                gradientColors={gradientColors}
                className="py-0"
                textClassName={`whitespace-nowrap ${textSizeClass}`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Subject Image — z-50 to ensure visibility */}
      <div className="absolute -bottom-12 z-50 w-full max-w-4xl lg:max-w-5xl h-[90vh] md:h-[95vh] flex items-end justify-center pointer-events-none">
        <div className="relative w-full h-full flex items-end justify-center">
          <img 
            alt="Samuel Nduka"
            src={heroImage}
            width="721"
            height="895"
            className="h-full w-auto object-contain object-bottom"
          />
        </div>
      </div>

      {/* Floating Stats - Positioned to the right of the subject, aligned with Header Connect button */}
      <div className="hidden md:flex absolute right-4 lg:right-8 top-[20%] lg:top-[25%] z-30 flex-col gap-8 lg:gap-14 text-right pointer-events-auto">
        <HeroStats isDark={isDark} />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div 
          className={`absolute -top-[20%] -left-[10%] w-[60%] h-[60%] blur-[150px] rounded-full ${isDark ? "bg-blue-900/20" : "bg-blue-100/40"}`} 
        />
        <div 
          className={`absolute top-[20%] -right-[10%] w-[40%] h-[40%] blur-[150px] rounded-full ${isDark ? "bg-orange-900/10" : "bg-orange-100/20"}`} 
        />
      </div>
    </section>
  );
}
