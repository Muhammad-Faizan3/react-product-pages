import React, { useRef, useState, useEffect, useCallback } from "react";

export default function VideoShowcase({
  topText = "INERTIA",
  bottomText = "STUDIOS",
  videoSrc = "/your-video.mp4", // <-- replace with your actual video file path/URL
}) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 = small video, 1 = fullscreen video

  const updateProgress = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollableHeight = el.offsetHeight - window.innerHeight;

    if (scrollableHeight <= 0) return;

    // How far we've scrolled into the section (0 at top, 1 at bottom)
    const raw = -rect.top / scrollableHeight;
    const clamped = Math.min(1, Math.max(0, raw));
    setProgress(clamped);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateProgress]);

  // Base video size is a wide rectangle (like the reference), blended smoothly
  // toward a true fullscreen 100vw x 100vh box as the user scrolls.
  const baseWidthVmin = 40;
  const baseHeightVmin = 23;

  const videoWidth = `calc(${baseWidthVmin * (1 - progress)}vmin + ${progress * 100}vw)`;
  const videoHeight = `calc(${baseHeightVmin * (1 - progress)}vmin + ${progress * 100}vh)`;
  const videoRadius = `${(1 - progress) * 6}px`;

  const headingOpacity = 1 - Math.min(1, progress * 1.8);
  const containerPadding = `${40 * (1 - progress)}px ${48 * (1 - progress)}px`;
  const gap = `${16 * (1 - progress)}px`;

  return (
    <section ref={sectionRef} className="scroll-video-section">
      <div
        className="scroll-video-sticky"
        style={{ padding: containerPadding, gap }}
      >
        <h1
          className="scroll-video-heading heading-top"
          style={{ opacity: headingOpacity }}
        >
          {topText}
        </h1>

        <div
          className="scroll-video-frame"
          style={{
            width: videoWidth,
            height: videoHeight,
            borderRadius: videoRadius,
          }}
        >
          <video
            className="scroll-video-el"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <h1
          className="scroll-video-heading heading-bottom"
          style={{ opacity: headingOpacity }}
        >
          {bottomText}
        </h1>
      </div>

      <style>{`
        .scroll-video-section {
          position: relative;
          width: 100%;
          height: 250vh; /* extra height gives scroll room to drive the animation */
          background: #ffffff;
        }

        .scroll-video-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .scroll-video-heading {
          margin: 0;
          width: 100%;
          font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
          font-weight: 800;
          font-size: clamp(40px, 9vw, 140px);
          letter-spacing: -0.01em;
          line-height: 1;
          color: #000000;
          text-transform: uppercase;
          white-space: nowrap;
          will-change: opacity;
        }

        .heading-top {
          text-align: left;
        }

        .heading-bottom {
          text-align: right;
        }

        .scroll-video-frame {
          overflow: hidden;
          background: #000000;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
          flex-shrink: 0;
        }

        .scroll-video-el {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        html.dark .scroll-video-section {
          background: #000000;
        }

        html.dark .scroll-video-heading {
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .scroll-video-heading {
            font-size: clamp(28px, 11vw, 80px);
          }
        }
      `}</style>
    </section>
  );
}