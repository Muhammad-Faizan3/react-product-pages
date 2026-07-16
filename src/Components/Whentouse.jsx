import React, { useRef, useLayoutEffect } from "react";
import { ScrollReveal, WaveText } from "../hooks/useInView";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VibrationIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    className="anim anim-line-draw transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
  >
    <path
      d="M1 13h3l2-8 3 16 3-16 3 16 3-16 2 8h3"
      stroke="black"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const TorqueSpikeIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    className="anim anim-line-draw transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12"
  >
    <path
      d="M1 20L7 8l3 6 4-11 4 14 3-6 3 4"
      stroke="black"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="24"
    height="26"
    viewBox="0 0 24 26"
    fill="none"
    className="anim anim-line-draw transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-1"
  >
    <path
      d="M12 1l10 4v7c0 6-4.5 10.5-10 12C6.5 22.5 2 18 2 12V5l10-4z"
      stroke="black"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M8 12.5l2.7 2.7L17 9"
      stroke="black"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DrillBitIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    className="anim anim-line-draw transition-transform duration-500 group-hover:scale-125 group-hover:rotate-90"
  >
    <circle cx="13" cy="13" r="10.5" stroke="black" strokeWidth="1.4" />
    <path
      d="M13 2.5v21M2.5 13h21M5.6 5.6l14.8 14.8M20.4 5.6L5.6 20.4"
      stroke="black"
      strokeWidth="1"
      opacity="0.5"
    />
    <circle cx="13" cy="13" r="2.6" fill="black" />
  </svg>
);

const ITEMS = [
  {
    num: "01",
    text: "High BHA vibrations when drilling with RSS in abrasive formations",
    Icon: VibrationIcon,
  },
  {
    num: "02",
    text: "Stick-Slip with sharp torque spikes",
    Icon: TorqueSpikeIcon,
  },
  {
    num: "03",
    text: "Protect MWD/LWD from shock and vibration loads",
    Icon: ShieldIcon,
  },
  {
    num: "04",
    text: "Drilling with PDC bits where cutter chipping is a risk",
    Icon: DrillBitIcon,
  },
];

export default function WhenToUse() {
  const rowsRef = useRef([]);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide in
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, x: -60, filter: "blur(8px)" },
          {
            opacity: 1, x: 0, filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Rows stagger from alternate sides
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row,
          {
            opacity: 0,
            x: i % 2 === 0 ? -80 : 80,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#f5f5f5] w-full overflow-hidden">
      <div className="border border-[#e5e5e5] overflow-hidden max-w-[1700px] mx-auto">

        {/* Heading - clip reveal */}
        <ScrollReveal animation="anim-clip-right">
          <div ref={headingRef} className="px-6 sm:px-10 lg:px-20 pt-10 pb-8 border-b border-[#e5e5e5]">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase text-black">
              <WaveText text="When to use" />
            </h2>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="px-6 sm:px-10 lg:px-20">
          <div className="h-[1px] bg-[#e5e5e5] anim anim-divider" />
        </div>

        {/* Rows */}
        <div>
          {ITEMS.map((item, i) => {
            const Icon = item.Icon;
            const animations = ["anim-fade-left", "anim-fade-right", "anim-fade-left", "anim-fade-right"];
            return (
              <ScrollReveal key={item.num} animation={animations[i]} delay={i + 1}>
                <div
                  ref={(el) => (rowsRef.current[i] = el)}
                  className={`group flex items-center gap-3 sm:gap-5 px-4 sm:px-6 md:px-10 lg:px-20 py-6 sm:py-8 transition-all duration-500 hover:bg-black/[0.04] hover:pl-8 sm:hover:pl-12 lg:hover:pl-24 ${
                    i !== ITEMS.length - 1 ? "border-b border-[#e5e5e5]" : ""
                  }`}
                >
                  {/* Pulsing dot */}
                  <span className="anim-pulse-dot shrink-0" />

                  {/* Number */}
                  <span className="text-[11px] tracking-[0.15em] text-gray-500 shrink-0 w-6 transition-colors duration-300 group-hover:text-black">
                    {item.num}
                  </span>

                  {/* Icon with bounce */}
                  <span className="shrink-0 text-black transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-1">
                    <Icon />
                  </span>

                  {/* Text */}
                  <span className="text-sm sm:text-base md:text-lg uppercase tracking-tight text-black transition-all duration-300 group-hover:tracking-[0.05em] min-w-0 flex-1">
                    {item.text}
                  </span>

                  {/* Arrow indicator */}
                  <span className="hidden sm:block ml-auto opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 text-[#000000] shrink-0">
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                      <path d="M0 6h18M14 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
