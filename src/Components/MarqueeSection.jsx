import React from "react";
import { useTheme } from '../App';

export default function LineTextHeading({
  text = "NOVA DRIVE",
  lineThickness = 2,   // thickness of each horizontal line (px)
  lineGap = 4,         // gap between lines (px)
  speed = 22,          // seconds per loop — higher = slower
}) {
  const { dark } = useTheme();
  return (
    <section className="line-text-section">
      <div className="line-text-marquee">
        <div
          className="line-text-track"
          style={{ "--speed": `${speed}s` }}
        >
          <h1
            className="line-text-heading"
            style={{
              "--line-thickness": `${lineThickness}px`,
              "--line-gap": `${lineGap}px`,
            }}
          >
            {text}
          </h1>
          <h1
            className="line-text-heading"
            style={{
              "--line-thickness": `${lineThickness}px`,
              "--line-gap": `${lineGap}px`,
            }}
          >
            {text}
          </h1>
        </div>
      </div>

      <style>{`
        .line-text-section {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 0;
          background: transparent;
          overflow: hidden;
        }

        .line-text-marquee {
          width: 100%;
          overflow: hidden;
        }

        .line-text-track {
          display: inline-flex;
          width: max-content;
          animation: line-text-scroll var(--speed, 22s) linear infinite;
        }

        @keyframes line-text-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .line-text-heading {
          margin: 0;
          padding: 0 40px;
          font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
          font-weight: 800;
          font-size: clamp(48px, 12vw, 180px);
          letter-spacing: 0.02em;
          line-height: 1;
          white-space: nowrap;
          text-align: center;

          /* --- the line-pattern fill --- */
          background-image: repeating-linear-gradient(
            to bottom,
            #000000 0px,
            #000000 var(--line-thickness),
            transparent var(--line-thickness),
            transparent calc(var(--line-thickness) + var(--line-gap))
          );
          background-size: 100% calc(var(--line-thickness) + var(--line-gap));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        html.dark .line-text-heading {
          background-image: repeating-linear-gradient(
            to bottom,
            #ffffff 0px,
            #ffffff var(--line-thickness),
            transparent var(--line-thickness),
            transparent calc(var(--line-thickness) + var(--line-gap))
          );
        }

        @media (max-width: 480px) {
          .line-text-heading {
            letter-spacing: 0.01em;
          }
        }
      `}</style>
    </section>
  );
}
