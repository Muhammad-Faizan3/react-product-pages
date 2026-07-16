import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import img from "../assets/12.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureHighlight() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="highlight-wrap w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="highlight-main w-full h-[55vh] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">

        {/* Left — heading + btn */}
        <div ref={leftRef} className="highlight-left rounded-2xl flex flex-col items-start justify-center p-8 sm:p-12 lg:p-16">
          <h2 className="highlight-heading">
            Store More,<br />Do More
          </h2>
          <button
            type="button"
            className="highlight-btn"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          >
            <span>Discover Now</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Right — image */}
        <div ref={rightRef} className="highlight-right rounded-2xl flex items-center justify-center p-4 overflow-hidden">
          <img src={img} alt="NovaDrive" className="highlight-image" />
        </div>
      </div>

      <style>{`
        .highlight-wrap {
          background: transparent;
        }

        .highlight-main {
          background: transparent;
        }

        .highlight-left {
          background: var(--hl-left-bg, #f0f0f0);
          border: 1px solid var(--hl-left-border, #dcdcdc);
          transition: background 0.4s, border-color 0.4s;
        }

        .highlight-heading {
          margin: 0 0 32px;
          font-family: "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 700;
          line-height: 1.1;
          color: var(--hl-text, #111);
        }

        .highlight-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 9999px;
          border: none;
          background: var(--hl-btn-bg, #111);
          color: var(--hl-btn-text, #fff);
          font-family: "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .highlight-btn:hover {
          background: #f97316;
          color: #fff;
        }

        .highlight-btn:active {
          background: var(--hl-btn-active, #111);
          color: var(--hl-btn-active-text, #fff);
        }

        .highlight-right {
          background: var(--hl-right-bg, #f0f0f0);
          border: 1px solid var(--hl-right-border, #dcdcdc);
          overflow: hidden;
          transition: background 0.4s, border-color 0.4s;
        }

        .highlight-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          display: block;
        }

        /* ===== DARK MODE ===== */
        html.dark .highlight-main {
          --hl-left-bg: #1a1a1a;
          --hl-left-border: #333;
          --hl-right-bg: #1a1a1a;
          --hl-right-border: #333;
          --hl-text: #f0f0f0;
          --hl-btn-bg: #fff;
          --hl-btn-text: #111;
          --hl-btn-active: #fff;
          --hl-btn-active-text: #111;
        }

        html.dark .highlight-btn:hover {
          background: #f97316;
          color: #fff;
        }

        html.dark .highlight-btn:active {
          background: #fff;
          color: #111;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .highlight-heading {
            font-size: clamp(28px, 8vw, 42px);
          }

          .highlight-left {
            padding: 32px 24px;
          }

          .highlight-right {
            padding: 0 24px 24px;
          }
        }
      `}</style>
    </section>
  );
}
