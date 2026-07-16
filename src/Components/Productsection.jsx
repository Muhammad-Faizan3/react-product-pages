import React, { useRef, useLayoutEffect } from "react";
import { ScrollReveal, useInView, useCountUp, WaveText } from "../hooks/useInView";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img5 from "../assets/product.png";

gsap.registerPlugin(ScrollTrigger);

const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 10 10" className="text-gray-600">
    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const ConnectorIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 56 56"
    fill="none"
    className="anim anim-line-draw transition-transform duration-500 ease-out group-hover:rotate-[30deg] group-hover:scale-110"
  >
    <rect x="8" y="18" width="22" height="20" rx="2" stroke="black" strokeWidth="1.5" />
    <rect x="30" y="22" width="18" height="12" rx="2" stroke="black" strokeWidth="1.2" opacity="0.55" />
    <line x1="14" y1="24" x2="14" y2="32" stroke="black" strokeWidth="1" opacity="0.5" />
    <line x1="18" y1="24" x2="18" y2="32" stroke="black" strokeWidth="1" opacity="0.5" />
    <line x1="22" y1="24" x2="22" y2="32" stroke="black" strokeWidth="1" opacity="0.5" />
  </svg>
);

const SpeedIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 56 56"
    fill="none"
    className="anim anim-line-draw transition-transform duration-700 ease-out group-hover:rotate-45 group-hover:scale-110"
  >
    <circle cx="28" cy="28" r="20" stroke="black" strokeWidth="1.5" />
    <path d="M28 12V28L38 34" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="28" cy="28" r="3" fill="black" opacity="0.55" />
  </svg>
);

const ShieldBody = () => (
  <svg width="80" height="72" viewBox="0 0 60 52" fill="none" overflow="visible"
    className="anim anim-line-draw transition-transform duration-500 ease-out group-hover:scale-110"
  >
    <path d="M30 4L52 14V32C52 42 30 50 30 50C30 50 8 42 8 32V14L30 4Z" stroke="black" strokeWidth="1.3" />
    <path d="M22 26L28 32L38 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SwivelIcon = () => (
  <svg
    width="28"
    height="60"
    viewBox="0 0 20 46"
    fill="none"
    className="anim anim-line-draw transition-transform duration-500 ease-out group-hover:translate-y-2"
  >
    <rect x="3" y="2" width="14" height="18" rx="2" stroke="black" strokeWidth="1.5" />
    <rect x="5" y="22" width="10" height="22" rx="1" stroke="black" strokeWidth="1.2" />
    <circle cx="10" cy="10" r="2" stroke="black" strokeWidth="1" />
  </svg>
);

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 text-[14px] tracking-[0.25em] text-gray-600 font-mono">
      <span className="text-gray-600 anim anim-pop">[</span>
      <span className="text-[13px]">{children}</span>
      <span className="text-gray-600 anim anim-pop delay-1">]</span>
    </div>
  );
}

function TagNumber({ label, num }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3 text-[13px] tracking-[0.2em] text-gray-600 font-mono uppercase">
        <span className="inline-block w-[8px] h-[8px] bg-[#000000] anim anim-pop" />
        {label}
      </div>
      <span className="text-[13px] text-gray-600 font-mono anim anim-fade-right">{num}</span>
    </div>
  );
}

const KEY_FEATURES = [
  "Dual Connector Design — USB-A on one end, Lightning on the other; rotate the sturdy metal swivel to switch between them",
  "256GB Capacity — Store thousands of photos, hours of 4K video, and all your files in one place",
  "USB 3.0 Speed — Faster read/write speeds compared to USB 2.0, so large file transfers take seconds, not minutes",
  "Durable Metal Casing — Brushed stainless-steel body resists everyday wear and scratches",
  "Compact & Portable — Built-in keyring loop; slips easily into a pocket, bag, or keychain",
  "Free Up Phone Storage — Offload photos and videos directly from your device to create more space",
];

const SPECS = [
  ["Capacity", "256GB"],
  ["Connectors", "USB-A 3.0 + Lightning"],
  ["Material", "Brushed stainless steel"],
  ["Speed", "USB 3.0 (up to 5 Gbps)"],
  ["Design", "360° swivel body"],
  ["Compatibility", "iPhone, iPad, USB-A devices"],
];

function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const [ref, count] = useCountUp(target, 1500);
  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function ProductSection() {
  const sectionRef = useRef(null);
  const statRefs = useRef([]);
  const cardRefs = useRef([]);
  const specRowRefs = useRef([]);
  const featureListRef = useRef(null);
  const whyRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger stat cards on scroll
      gsap.fromTo(statRefs.current,
        { opacity: 0, y: 50, filter: "blur(6px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards 3D tilt on hover
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 10,
            rotateX: -y * 8,
            y: -4,
            duration: 0.4,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });

      // Spec rows stagger reveal
      gsap.fromTo(specRowRefs.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: specRowRefs.current[0],
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Feature list items stagger
      if (featureListRef.current) {
        const items = featureListRef.current.querySelectorAll("li");
        gsap.fromTo(items,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featureListRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Why section reveal
      if (whyRef.current) {
        gsap.fromTo(whyRef.current,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whyRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-white text-gray-900 font-sans w-full overflow-hidden">
      <div className="max-w-[1700px] mx-auto">

      {/* ===== SECTION 1: PRODUCT OVERVIEW ===== */}
      <section className="border border-gray-200 border-b-0">
        <ScrollReveal animation="anim-fade-up">
          <div className="px-6 sm:px-10 lg:px-20 pt-12 pb-10 border-b border-gray-200">
            <Eyebrow>ABOUT</Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase font-light">
              <WaveText text="NovaDrive 2-in-1" />
            </h2>
            <p className="mt-5 text-base sm:text-[17px] text-gray-600 max-w-3xl leading-relaxed anim anim-fade-up delay-5">
              The NovaDrive 2-in-1 Flash Drive combines a high-speed USB 3.0 connector and a Lightning connector in a single, swivel-body design. Instantly move photos, videos, and documents between your iPhone/iPad and any USB-A device — no adapters, no apps required for basic transfer.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-4">
          {/* Stat 1: Capacity */}
          <div
            ref={(el) => (statRefs.current[0] = el)}
            className="group p-4 sm:p-8 border-t sm:border-t-0 border-r border-gray-200 flex flex-col gap-4 sm:gap-8 transition-all duration-500 hover:bg-gray-50"
            style={{ perspective: "800px" }}
          >
            <div className="flex items-center gap-3 text-[11px] sm:text-[13px] tracking-[0.2em] text-gray-600 font-mono uppercase">
              Capacity
            </div>
            <div className="text-4xl sm:text-6xl tracking-tight font-light">
              <AnimatedCounter target={256} suffix="" />
              <span className="text-[#000000] text-2xl sm:text-4xl">GB</span>
            </div>
            <div className="text-base text-gray-600">Store thousands of photos and hours of 4K video</div>
            <div className="w-0 h-[2px] bg-[#000000] transition-all duration-700 group-hover:w-full" />
          </div>

          {/* Stat 2: Speed */}
          <div
            ref={(el) => (statRefs.current[1] = el)}
            className="group p-4 sm:p-8 border-t sm:border-t-0 border-r border-gray-200 flex flex-col gap-4 sm:gap-8 transition-all duration-500 hover:bg-gray-50"
            style={{ perspective: "800px" }}
          >
            <div className="flex items-center gap-3 text-[11px] sm:text-[13px] tracking-[0.2em] text-gray-600 font-mono uppercase">
              Speed
            </div>
            <div className="text-4xl sm:text-6xl tracking-tight font-light">
              USB 3.0
            </div>
            <div className="text-base text-gray-600">Faster read/write vs USB 2.0</div>
            <div className="w-0 h-[2px] bg-[#000000] transition-all duration-700 group-hover:w-full" />
          </div>

          {/* Stat 3: Dual Connector */}
          <div
            ref={(el) => (statRefs.current[2] = el)}
            className="group p-4 sm:p-8 border-t sm:border-t-0 border-r border-gray-200 flex flex-col gap-4 sm:gap-8 transition-all duration-500 hover:bg-gray-50"
            style={{ perspective: "800px" }}
          >
            <div className="flex items-center gap-3 text-[11px] sm:text-[13px] tracking-[0.2em] text-gray-600 font-mono uppercase">
              Dual Connector
            </div>
            <SwivelIcon />
            <div className="text-base text-gray-600">USB-A + Lightning in one</div>
            <div className="w-0 h-[2px] bg-[#000000] transition-all duration-700 group-hover:w-full" />
          </div>

          {/* Stat 4: Decorative */}
          <div
            ref={(el) => (statRefs.current[3] = el)}
            className="hidden sm:grid grid-cols-10 gap-4 p-6 place-content-start"
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className={`anim anim-pop delay-${(i % 12) + 1}`}>
                <Plus />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: KEY FEATURES ===== */}
      <section className="border border-gray-200 border-t-0">
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ perspective: "1200px" }}>

          {/* Card 1: Dual Connector */}
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className="group p-6 sm:p-10 border-b border-r border-gray-200 flex flex-col gap-6 sm:gap-8 min-h-[200px] sm:min-h-[260px] transition-all duration-500 hover:bg-gray-50"
            style={{ transformStyle: "preserve-3d" }}
          >
            <TagNumber label="Dual Connector Design" num="01" />
            <ConnectorIcon />
            <div>
              <h3 className="text-xl sm:text-2xl tracking-tight uppercase mb-3 font-light">
                USB-A + Lightning
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-sm">
                USB-A on one end, Lightning on the other; rotate the sturdy metal swivel to switch between them. No adapters needed — plug directly into your iPhone/iPad or any USB-A device.
              </p>
            </div>
            <div className="w-0 h-[1px] bg-gray-900/10 transition-all duration-700 group-hover:w-16 mt-auto" />
          </div>

          {/* Card 2: USB 3.0 Speed */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className="group p-6 sm:p-10 border-b border-gray-200 flex flex-col gap-6 sm:gap-8 min-h-[200px] sm:min-h-[260px] transition-all duration-500 hover:bg-gray-50"
            style={{ transformStyle: "preserve-3d" }}
          >
            <TagNumber label="USB 3.0 Speed" num="02" />
            <SpeedIcon />
            <div>
              <h3 className="text-xl sm:text-2xl tracking-tight uppercase mb-3 font-light">
                Transfer in Seconds
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-sm">
                Faster read/write speeds compared to USB 2.0, so large file transfers take seconds, not minutes. Move 4K videos and large photo libraries with ease.
              </p>
            </div>
            <div className="w-0 h-[1px] bg-gray-900/10 transition-all duration-700 group-hover:w-16 mt-auto" />
          </div>

          {/* Card 3: Durable Build */}
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className="group p-6 sm:p-10 border-r border-gray-200 flex flex-col gap-6 sm:gap-8 min-h-[200px] sm:min-h-[260px] transition-all duration-500 hover:bg-gray-50"
            style={{ transformStyle: "preserve-3d" }}
          >
            <TagNumber label="Built to Last" num="03" />
            <div className="pt-2">
              <ShieldBody />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl tracking-tight uppercase mb-3 font-light">
                Durable Metal Casing
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-sm">
                Brushed stainless-steel body resists everyday wear and scratches. Compact design with built-in keyring loop — slips easily into a pocket, bag, or keychain.
              </p>
            </div>
            <div className="w-0 h-[1px] bg-gray-900/10 transition-all duration-700 group-hover:w-16 mt-auto" />
          </div>

          {/* Card 4: product image */}
          <div className="bg-gray-50 min-h-[200px] sm:min-h-[260px] flex items-center justify-center group hover:bg-gray-100 transition-colors duration-500 overflow-hidden p-6">
            <img
              src={img5}
              alt="NovaDrive 2-in-1 Flash Drive"
              className="w-full max-w-[280px] sm:max-w-[320px] h-auto max-h-[300px] sm:max-h-[399px] object-contain transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* SPECS TABLE */}
        <ScrollReveal animation="anim-fade-up" delay={1}>
          <div className="px-6 sm:px-10 lg:px-20 py-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase mb-8 font-light">
              <WaveText text="Specifications" />
            </h2>

            <div className="overflow-x-auto">
              <div className="border border-gray-200 text-base min-w-[400px]">
                {/* Header */}
                <div className="grid grid-cols-2 bg-gray-100 text-gray-600 font-mono text-[13px] uppercase tracking-wide">
                  <div className="p-4 border-r border-gray-200 anim anim-fade-left">Spec</div>
                  <div className="p-4 anim anim-fade-right delay-1">Detail</div>
                </div>

                {/* Rows */}
                {SPECS.map((row, i) => (
                  <div
                    key={row[0]}
                    ref={(el) => (specRowRefs.current[i] = el)}
                    className={`grid grid-cols-2 ${
                      i % 2 === 0 ? "bg-transparent" : "bg-gray-50"
                    } border-t border-gray-200 cursor-default transition-colors duration-300 hover:bg-gray-100 hover:pl-2`}
                  >
                    <div className="p-4 border-r border-gray-200 text-gray-700 text-[15px]">
                      {row[0]}
                    </div>
                    <div className="p-4 text-gray-700 text-[15px]">{row[1]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ===== SECTION 3: KEY FEATURES LIST + BOX CONTENTS ===== */}
        <ScrollReveal animation="anim-fade-up" delay={1}>
          <div className="px-6 sm:px-10 lg:px-20 py-12 border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Key Features */}
              <div>
                <h2 className="text-3xl sm:text-4xl tracking-tight uppercase mb-8 font-light">
                  <WaveText text="Key Features" />
                </h2>
                <ul ref={featureListRef} className="space-y-4">
                  {KEY_FEATURES.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 leading-relaxed hover:text-gray-700 transition-colors duration-300 cursor-default">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#000000] shrink-0 transition-transform duration-300 hover:scale-150" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box Contents + Why Choose */}
              <div>
                <h2 className="text-3xl sm:text-4xl tracking-tight uppercase mb-8 font-light">
                  <WaveText text="In The Box" />
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-8">
                  1x NovaDrive 2-in-1 Flash Drive (256GB)
                </p>

                <div className="w-0 h-[2px] bg-[#000000] anim anim-divider mb-8" />

                <div ref={whyRef}>
                  <h2 className="text-3xl sm:text-4xl tracking-tight uppercase mb-6 font-light">
                    <WaveText text="Why NovaDrive" />
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Whether you're backing up your camera roll, transferring work files, or carrying a portable media library, NovaDrive gives you plug-and-play convenience across both Apple and standard USB devices — all in one compact tool.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>
      </div>
    </div>
  );
}