import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import imgA from "../assets/product2.jpg";
import imgB from "../assets/hero.png";
import imgC from "../assets/product1.jpeg";
import imgD from "../assets/WhatsApp Image 2026-07-11 at 5.13.54 PM.jpeg";
import imgE from "../assets/product.png";
import imgF from "../assets/f288f5a2be3d65afaf508558ff0e33ba.jpg";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { src: imgA, title: "Aurora Commerce", category: "E-Commerce Platform" },
  { src: imgB, title: "Helios Mobility", category: "Mobility Experience" },
  { src: imgC, title: "Monolith Studio", category: "Creative Studio" },
  { src: imgD, title: "Digital Craft", category: "Digital Product" },
  { src: imgE, title: "Nova Dynamics", category: "SaaS Dashboard" },
  { src: imgF, title: "Zenith Labs", category: "Brand Identity" },
];

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const imageEls = useRef([]);
  const headingRef = useRef(null);
  const scrollHintRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const N = IMAGES.length;

      imageEls.current.forEach((el, i) => {
        if (!el) return;
        if (i === 0) {
          gsap.set(el, { yPercent: 0, scale: 1, opacity: 1, filter: "blur(0px)" });
        } else {
          gsap.set(el, { yPercent: 100, scale: 1.05, opacity: 0, filter: "blur(6px)" });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(N - 1) * window.innerHeight}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const idx = Math.min(Math.floor(self.progress * N), N - 1);
            setActive(idx);
          },
        },
      });

      if (headingRef.current) {
        tl.to(headingRef.current, {
          yPercent: -50, opacity: 0, filter: "blur(10px)",
          ease: "power3.in", duration: 0.4,
        }, 0);
      }

      if (scrollHintRef.current) {
        tl.to(scrollHintRef.current, {
          opacity: 0, y: -10,
          ease: "power2.in", duration: 0.25,
        }, 0);
      }

      for (let i = 0; i < N - 1; i++) {
        const out = imageEls.current[i];
        const ins = imageEls.current[i + 1];
        if (!out || !ins) continue;

        tl.to(out, {
          yPercent: -100, scale: 0.96, opacity: 0, filter: "blur(4px)",
          ease: "power3.inOut", duration: 1,
        }, i);

        tl.fromTo(ins,
          { yPercent: 100, scale: 1.05, opacity: 0, filter: "blur(6px)" },
          { yPercent: 0, scale: 1, opacity: 1, filter: "blur(0px)",
            ease: "power3.out", duration: 1 },
          i
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="selected-work relative h-screen bg-[#0a0a0a] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.08] z-40" />

      {IMAGES.map((img, i) => (
        <div
          key={i}
          ref={(el) => { imageEls.current[i] = el; }}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: i + 1 }}
        >
          <img
            src={img.src}
            alt={img.title}
            className="w-full h-full object-cover will-change-[transform,opacity,filter]"
            draggable={false}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

          <div className="absolute bottom-10 left-10 sm:bottom-14 sm:left-14 lg:bottom-16 lg:left-16 z-10">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white/40 mb-2.5 font-medium">
              {img.category}
            </p>
            <h3 className="text-[24px] sm:text-[32px] lg:text-[42px] font-light tracking-tight leading-tight">
              {img.title}
            </h3>
          </div>
        </div>
      ))}

      <div
        ref={headingRef}
        className="absolute inset-0 flex items-center justify-center z-[200] pointer-events-none"
      >
        <div className="text-center px-6">
          <h2 className="text-[32px] sm:text-[52px] lg:text-[72px] xl:text-[88px] leading-[1.02] font-light tracking-tight mb-8">
            Selected work
          </h2>
          <div ref={scrollHintRef} className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-white/20" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/30">
                Scroll to explore
              </span>
              <span className="w-8 h-px bg-white/20" />
            </div>
            <div className="w-5 h-8 border-[1.5px] border-white/20 rounded-[10px] flex justify-center pt-1.5">
              <div className="w-[1.5px] h-2 bg-white/50 rounded-full animate-[scrollBounce_1.8s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-8 right-8 sm:top-10 sm:right-10 z-40 tabular-nums select-none">
        <span className="text-[13px] font-light tracking-wider text-white/90">
          {String(active + 1).padStart(2, "0")}
        </span>
        <span className="text-[13px] text-white/20 mx-1.5">/</span>
        <span className="text-[13px] font-light tracking-wider text-white/20">
          {String(IMAGES.length).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5">
        {IMAGES.map((_, i) => (
          <div
            key={i}
            className="rounded-full will-change-[height,background-color]"
            style={{
              width: 3,
              height: i === active ? 28 : 10,
              backgroundColor: i === active ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.15)",
              transition: "height 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.5s ease",
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/[0.04] z-40">
        <div
          ref={progressRef}
          className="h-full bg-white/50 origin-left will-change-[transform]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.08] z-40" />
    </section>
  );
}
