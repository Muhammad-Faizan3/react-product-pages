import { useEffect, useRef, useState, useCallback } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export function ScrollReveal({
  children,
  className = "",
  animation = "anim-fade-up",
  delay = 0,
  as = "div",
}) {
  const [ref, inView] = useInView();
  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`${animation} ${delay ? `delay-${delay}` : ""} ${inView ? "in-view" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* Global auto-init: watches all .anim elements in the DOM */
export function useAutoAnim() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    const observe = () => {
      document.querySelectorAll(".anim:not(.in-view)").forEach((el) => {
        observer.observe(el);
      });
    };

    observe();

    const mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

/* Count-up hook: animates a number from 0 to target */
export function useCountUp(target, duration = 1200, startOnView = true) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!startOnView || !inView || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration, startOnView]);

  return [ref, count];
}

/* Split text to animated spans */
export function WaveText({ text, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <span ref={ref} className={`anim-wave ${inView ? "in-view" : ""} ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
