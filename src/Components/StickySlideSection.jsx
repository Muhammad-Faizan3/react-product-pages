import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import img from "../assets/9.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function StickySlideSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

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
    <section ref={sectionRef} className="feature-main w-full h-[55vh] grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">

      {/* Left — image */}
      <div ref={leftRef} className="feature-left rounded-3xl flex items-center justify-center p-4 overflow-hidden">
        <img src={img} alt="NovaDrive Feature" className="feature-image" />
      </div>

      {/* Right — heading + text + btn */}
      <div ref={rightRef} className="feature-right rounded-3xl flex flex-col items-start justify-center p-8 sm:p-12 lg:p-16">
        <h2 className="feature-heading">
          Engineered for Every Moment
        </h2>
        <p className="feature-text">
          Dual-connector storage designed to keep up with your life. Fast transfers, durable build, and seamless compatibility.
        </p>
        <button type="button" className="feature-btn">
          <span>Learn More</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        .feature-main {
          background: transparent;
        }

        .feature-left {
          background: var(--feature-left-bg, #f0f0f0);
          border: 1px solid var(--feature-left-border, #dcdcdc);
          overflow: hidden;
          transition: background 0.4s, border-color 0.4s;
        }

        .feature-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          display: block;
        }

        .feature-right {
          background: var(--feature-right-bg, #f0f0f0);
          border: 1px solid var(--feature-right-border, #dcdcdc);
          transition: background 0.4s, border-color 0.4s;
        }

        .feature-heading {
          margin: 0 0 16px;
          font-family: "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 600;
          line-height: 1.2;
          color: var(--feature-text, #111);
        }

        .feature-text {
          margin: 0 0 28px;
          font-family: "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
          font-size: 16px;
          line-height: 1.7;
          color: var(--feature-text-dim, #666);
        }

        .feature-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          border-radius: 9999px;
          border: none;
          background: var(--feature-btn-bg, #111);
          color: var(--feature-btn-text, #fff);
          font-family: "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .feature-btn:hover {
          background: #f97316;
          color: #fff;
        }

        .feature-btn:active {
          background: var(--feature-btn-active, #111);
          color: var(--feature-btn-active-text, #fff);
        }

        /* ===== DARK MODE ===== */
        html.dark .feature-main {
          --feature-left-bg: #1a1a1a;
          --feature-left-border: #333;
          --feature-right-bg: #1a1a1a;
          --feature-right-border: #333;
          --feature-text: #f0f0f0;
          --feature-text-dim: #999;
          --feature-btn-bg: #fff;
          --feature-btn-text: #111;
          --feature-btn-active: #fff;
          --feature-btn-active-text: #111;
        }

        html.dark .feature-btn:hover {
          background: #f97316;
          color: #fff;
        }

        html.dark .feature-btn:active {
          background: #fff;
          color: #111;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .feature-main {
            height: auto;
            grid-template-rows: 1fr 1fr;
            gap: 12px;
            padding: 12px;
          }

          .feature-right {
            padding: 32px 24px;
          }

          .feature-image {
            border-radius: 16px;
          }
        }
      `}</style>
    </section>
  );
}
