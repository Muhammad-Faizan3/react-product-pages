import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from '../App';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const { dark } = useTheme();

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    const onMouseDown = () => {
      setClicking(true);
      gsap.to(ring, { scale: 0.6, duration: 0.15, ease: "power2.out" });
    };
    const onMouseUp = () => {
      setClicking(false);
      gsap.to(ring, { scale: hovering ? 1.6 : 1, duration: 0.3, ease: "back.out(3)" });
    };

    const addHoverListeners = () => {
      document.querySelectorAll("button, a, [role='button'], input, textarea, .tilt-card, .img-zoom").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setHovering(true);
          gsap.to(ring, { scale: 1.6, borderColor: dark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)", duration: 0.3, ease: "power2.out" });
          gsap.to(glow, { scale: 1.8, opacity: 0.4, duration: 0.4, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          setHovering(false);
          gsap.to(ring, { scale: 1, borderColor: dark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)", duration: 0.3, ease: "power2.out" });
          gsap.to(glow, { scale: 1, opacity: 0.15, duration: 0.4, ease: "power2.out" });
        });
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Re-attach hover listeners on DOM changes
    addHoverListeners();
    const mutObs = new MutationObserver(addHoverListeners);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      mutObs.disconnect();
    };
  }, [hovering, visible, dark]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dark ? '#F5F5F5' : '#000000',
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          mixBlendMode: "normal",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid ${dark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}`,
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          mixBlendMode: "normal",
        }}
      />
      {/* Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'} 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          opacity: visible ? 0.15 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </>
  );
}
