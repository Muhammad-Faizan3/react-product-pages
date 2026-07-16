import React, { useRef, useState, useEffect, useCallback } from "react";

export default function VideoShowcase({
  topText = "INERTIA",
  bottomText = "STUDIOS",
  videoSrc = "/your-video.mp4",
  scrollLengthVh = 300,
}) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("before");

  const updateProgress = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollableHeight = el.offsetHeight - vh;

    if (scrollableHeight <= 0) return;

    if (rect.top > 0) {
      setPhase("before");
      setProgress(0);
    } else if (rect.bottom < vh) {
      setPhase("after");
      setProgress(1);
    } else {
      setPhase("pinned");
      const raw = -rect.top / scrollableHeight;
      setProgress(Math.min(1, Math.max(0, raw)));
    }
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

  const baseWidthVmin = 40;
  const baseHeightVmin = 23;

  const videoWidth = `calc(${baseWidthVmin * (1 - progress)}vmin + ${progress * 100}vw)`;
  const videoHeight = `calc(${baseHeightVmin * (1 - progress)}vmin + ${progress * 100}vh)`;
  const videoRadius = `${(1 - progress) * 6}px`;

  const headingOpacity = 1 - Math.min(1, progress * 1.8);
  const containerPadding = `${40 * (1 - progress)}px ${48 * (1 - progress)}px`;
  const gap = `${16 * (1 - progress)}px`;

  const stageStyle =
    phase === "before"
      ? { position: "absolute", top: 0, left: 0 }
      : phase === "after"
      ? { position: "absolute", bottom: 0, left: 0 }
      : { position: "fixed", top: 0, left: 0 };

  return (
    <section
      ref={sectionRef}
      className="scroll-video-section"
      style={{ height: `${scrollLengthVh}vh` }}
    >
      <div
        className="scroll-video-stage"
        style={{ ...stageStyle, padding: containerPadding, gap }}
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
          background: #ffffff;
          will-change: auto !important;
        }

        .scroll-video-stage {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          z-index: 50;
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