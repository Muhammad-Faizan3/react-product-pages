import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { Check, Minus, Plus, ShieldCheck, RotateCcw, Truck, Lock, Star, Heart, Share2, ShoppingBag, Zap, Battery, HardDrive } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "../context/CartContext";
import { useTheme } from "../App";

gsap.registerPlugin(ScrollTrigger);

import image32 from "../assets/WhatsApp Image 2026-07-11 at 5.07.56 PM (1).jpeg";
import image64 from "../assets/WhatsApp Image 2026-07-11 at 5.07.56 PM.jpeg";
import image128 from "../assets/WhatsApp Image 2026-07-11 at 5.13.54 PM.jpeg";

const productImages = {
  "32GB": image32,
  "64GB": image64,
  "128GB": image128,
  "16GB": image32,
  "256GB": image64,
};

const product = {
  name: "NovaDrive 2-in-1 Flash Drive",
  collection: "Accessories",
  description: "Dual-connector storage for everyday use",
  tags: ["Cable", "Connector"],
  features: [
    { icon: ShieldCheck, label: "1-year warranty" },
    { icon: RotateCcw, label: "7-day returns" },
    { icon: Truck, label: "Free shipping" },
    { icon: Lock, label: "Secure checkout" },
  ],
  variants: [
    { capacity: "16GB", price: 6000, stock: 100 },
    { capacity: "32GB", price: 10000, stock: 100 },
    { capacity: "64GB", price: 15000, stock: 80 },
    { capacity: "128GB", price: 20000, stock: 50 },
    { capacity: "256GB", price: 35000, stock: 80 },
  ],
};

const floatingCards = [
  { icon: Zap, label: "USB 3.0", sub: "Ultra Fast", x: "-12%", y: "18%", delay: 0 },
  { icon: Battery, label: "256GB", sub: "Max Storage", x: "88%", y: "25%", delay: 0.3 },
  { icon: HardDrive, label: "Dual", sub: "Connector", x: "-8%", y: "65%", delay: 0.6 },
];

const formatPrice = (price) => `PKR ${price.toLocaleString()}`;

/* ── Split Text Component ── */
function SplitText({ text, className = "", tag: Tag = "span" }) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    const el = ref.current;
    const chars = el.querySelectorAll(".split-char");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          gsap.fromTo(chars,
            { opacity: 0, y: 60, rotateX: -40, filter: "blur(8px)" },
            {
              opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.025,
              ease: "power4.out",
            }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ perspective: "600px" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{ opacity: 0, transformOrigin: "bottom center" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}

/* ── Floating Card ── */
function FloatingProductCard({ icon: Icon, label, sub, x, y, delay }) {
  const ref = useRef(null);
  const { dark } = useTheme();

  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, scale: 0.7, y: 20 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1,
        delay: 1.2 + delay,
        ease: "power3.out",
      }
    );
    gsap.to(ref.current, {
      y: -8,
      duration: 3 + delay,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 2 + delay,
    });
  }, [delay]);

  return (
    <div
      ref={ref}
      className="absolute z-20 hidden lg:block"
      style={{ left: x, top: y, opacity: 0 }}
    >
      <div className={`glass-card rounded-2xl px-5 py-4 flex items-center gap-3 min-w-[140px] ${
        dark ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white/70 backdrop-blur-xl border-black/5 shadow-lg shadow-black/5'
      }`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          dark ? 'bg-white/5' : 'bg-black/5'
        }`}>
          <Icon size={18} className="text-[#e8572a]" />
        </div>
        <div>
          <div className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{label}</div>
          <div className={`text-[11px] tracking-wide ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{sub}</div>
        </div>
      </div>
    </div>
  );
}

export default function Product() {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(product.variants[0].capacity);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const { dark } = useTheme();

  const inStock = selectedVariant.stock > 0;

  const sectionRef = useRef(null);
  const imageBoxRef = useRef(null);
  const imageRef = useRef(null);
  const reflectionRef = useRef(null);
  const ambientGlowRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const variantRefs = useRef([]);
  const quantityRef = useRef(null);
  const buttonRef = useRef(null);
  const featureRefs = useRef([]);
  const wishlistRef = useRef(null);
  const shareRef = useRef(null);
  const priceRef = useRef(null);
  const metaRef = useRef(null);

  /* ── Hero entrance animation ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 0.7, rotateY: -20, y: 60 },
        { opacity: 1, scale: 1, rotateY: 0, y: 0, duration: 1.6, ease: "power4.out" }
      )
      .fromTo(ambientGlowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.4 },
        "-=1.2"
      )
      .fromTo(heroSubtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        "-=0.8"
      )
      .fromTo(priceRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(metaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(variantRefs.current,
        { opacity: 0, y: 12, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06 },
        "-=0.2"
      )
      .fromTo(quantityRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5 },
        "-=0.15"
      )
      .fromTo(buttonRef.current,
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.1"
      )
      .fromTo(featureRefs.current,
        { opacity: 0, y: 12, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05 },
        "-=0.1"
      )
      .fromTo([wishlistRef.current, shareRef.current],
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(3)", stagger: 0.1 },
        "-=0.3"
      );

      /* Floating image */
      gsap.to(imageRef.current, {
        y: -12, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1,
      });
      gsap.to(reflectionRef.current, {
        y: -12, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1,
      });

      /* Mouse parallax */
      const imageBox = imageBoxRef.current;
      if (imageBox) {
        const handleMouseMove = (e) => {
          const rect = imageBox.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const mx = (e.clientX - cx) / rect.width;
          const my = (e.clientY - cy) / rect.height;

          gsap.to(imageRef.current, {
            rotateY: mx * 12, rotateX: -my * 8, x: mx * 18, y: my * 10,
            duration: 1, ease: "power2.out",
          });
          gsap.to(reflectionRef.current, {
            rotateY: mx * 6, x: mx * 8, duration: 1.2, ease: "power2.out",
          });
        };
        const handleMouseLeave = () => {
          gsap.to(imageRef.current, {
            rotateY: 0, rotateX: 0, x: 0, y: 0,
            duration: 1.2, ease: "elastic.out(1, 0.4)",
          });
          gsap.to(reflectionRef.current, {
            rotateY: 0, x: 0, duration: 1.2, ease: "elastic.out(1, 0.4)",
          });
        };
        imageBox.addEventListener("mousemove", handleMouseMove);
        imageBox.addEventListener("mouseleave", handleMouseLeave);
      }

      /* Ambient glow pulse */
      gsap.to(ambientGlowRef.current, {
        opacity: 0.5, scale: 1.08, duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true,
      });

      /* Scroll zoom */
      gsap.to(imageRef.current, {
        scale: 1.12, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", end: "bottom top", scrub: 1.5,
        },
      });

      /* Staggered float for features */
      featureRefs.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: -3, duration: 1.8 + i * 0.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.1,
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Variant image cross-fade ── */
  useLayoutEffect(() => {
    if (!imageRef.current) return;

    gsap.killTweensOf(imageRef.current);
    gsap.killTweensOf(reflectionRef.current);

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(imageRef.current, {
      opacity: 0, scale: 0.6, rotateY: 20, filter: "blur(12px)", duration: 0.4,
    })
    .to(reflectionRef.current, { opacity: 0, duration: 0.25 }, "-=0.25")
    .call(() => setDisplayedImage(selectedVariant.capacity))
    .fromTo(imageRef.current,
      { opacity: 0, scale: 0.4, rotateY: -20, filter: "blur(16px)", x: 30 },
      { opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)", x: 0, duration: 0.85, ease: "power3.out" }
    )
    .fromTo(reflectionRef.current,
      { opacity: 0 },
      { opacity: 0.15, duration: 0.6 },
      "-=0.4"
    );

    return () => { tl.kill(); };
  }, [selectedVariant]);

  const handleVariantSelect = useCallback((variant, e) => {
    if (selectedVariant.capacity === variant.capacity) return;
    setSelectedVariant(variant);
    setQuantity(1);
    setAdded(false);

    const index = product.variants.indexOf(variant);
    if (variantRefs.current[index]) {
      gsap.fromTo(variantRefs.current[index],
        { scale: 0.85 },
        { scale: 1, duration: 0.5, ease: "back.out(4)" }
      );
    }
    if (e && e.currentTarget) {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `position:absolute;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(232,87,42,0.15);pointer-events:none;transform:scale(0);`;
      btn.appendChild(ripple);
      gsap.to(ripple, { scale: 2.5, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() });
    }
  }, [selectedVariant]);

  const changeQuantity = useCallback((delta, e) => {
    setQuantity((q) => Math.min(Math.max(q + delta, 1), selectedVariant.stock));
    if (e.currentTarget) {
      gsap.fromTo(e.currentTarget,
        { scale: 0.75, rotate: delta > 0 ? -12 : 12 },
        { scale: 1, rotate: 0, duration: 0.4, ease: "back.out(3)" }
      );
    }
  }, [selectedVariant]);

  const handleAddToCart = useCallback(() => {
    setAdded(true);
    addItem(product, quantity, selectedVariant);
    if (buttonRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(buttonRef.current, { scale: 0.92, y: 6 }, { scale: 1, y: 0, duration: 0.5, ease: "back.out(4)" })
        .to(buttonRef.current, { backgroundColor: "#16a34a", duration: 0.3, ease: "power2.inOut" });
    }
    setTimeout(() => {
      setAdded(false);
      if (buttonRef.current) gsap.to(buttonRef.current, { backgroundColor: "transparent", duration: 0.3 });
    }, 2500);
  }, [addItem, quantity, selectedVariant]);

  const handleWishlist = useCallback(() => {
    setIsWishlisted(!isWishlisted);
    if (wishlistRef.current) {
      gsap.fromTo(wishlistRef.current, { scale: 0.4 }, {
        scale: 1.2, duration: 0.3, ease: "back.out(4)",
        onComplete: () => gsap.to(wishlistRef.current, { scale: 1, duration: 0.2 }),
      });
    }
  }, [isWishlisted]);

  const handleShare = useCallback(() => {
    if (shareRef.current) {
      gsap.fromTo(shareRef.current, { rotate: 0 }, { rotate: 360, duration: 0.6, ease: "power2.out" });
    }
  }, []);

  return (
    <section ref={sectionRef} className={`relative w-full overflow-hidden transition-colors duration-700 ${
      dark
        ? 'bg-[#050505]'
        : 'bg-gradient-to-b from-[#f8f6f4] via-white to-[#f8f6f4]'
    }`}>
      {/* ═══ SMOKE & LIGHT BEAM EFFECTS ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light beams - softer for light mode */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[60%] bg-gradient-to-b from-amber-200/30 dark:from-white/[0.06] via-amber-100/20 dark:via-white/[0.02] to-transparent light-beam" />
        <div className="absolute top-0 left-[35%] w-[1px] h-[40%] bg-gradient-to-b from-amber-200/20 dark:from-white/[0.04] via-amber-100/10 dark:via-white/[0.01] to-transparent light-beam-delayed" />
        <div className="absolute top-0 right-[30%] w-[1px] h-[45%] bg-gradient-to-b from-amber-200/15 dark:from-white/[0.03] via-amber-100/5 dark:via-white/[0.01] to-transparent light-beam" style={{ animationDelay: "1s" }} />

        {/* Smoke layers - warm tones for light mode */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-amber-100/40 dark:bg-white/[0.015] blur-[120px] smoke-layer" />
        <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-amber-100/30 dark:bg-white/[0.01] blur-[100px] smoke-layer-2" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#e8572a]/[0.06] dark:bg-[#e8572a]/[0.02] blur-[150px] ambient-glow" />

        {/* Thin horizontal lines for depth - softer for light */}
        <div className="absolute top-[25%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-200/30 dark:via-white/[0.03] to-transparent" />
        <div className="absolute top-[75%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-200/20 dark:via-white/[0.02] to-transparent" />
      </div>

      <div className="relative w-full mx-auto px-6 sm:px-10 lg:px-20 xl:px-[120px] pt-12 lg:pt-[80px] pb-16 lg:pb-[100px]" style={{ maxWidth: "1700px" }}>

        {/* ═══ HERO SUBTITLE ═══ */}
        <div ref={heroSubtitleRef} className="mb-10 lg:mb-16 flex items-center gap-4 flex-wrap">
          <span className={`label-premium tracking-[0.3em] ${dark ? 'text-gray-400' : 'text-[#8a7a6e]'}`}>2-IN-1 FLASH DRIVE</span>
            <span className={`w-12 h-[1px] ${dark ? 'bg-white/10' : 'bg-[#d4c8be]'}`} />
            <span className={`label-premium tracking-[0.2em] ${dark ? 'text-gray-600' : 'text-[#b8aa9e]'}`}>PREMIUM STORAGE</span>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16 relative">

          {/* ── Left: Product Showcase ── */}
          <div className="relative">
            <div
              ref={imageBoxRef}
              className={`relative w-full h-[400px] sm:h-[520px] lg:h-[640px] rounded-[1.5rem] flex items-center justify-center overflow-visible ${
                dark
                  ? 'bg-gradient-to-br from-white/5 to-white/0 border-white/5'
                  : 'bg-gradient-to-br from-[#f0ebe7] to-[#f8f5f2] border-[#e8e0da] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_20px_60px_-20px_rgba(0,0,0,0.08)]'
              }`}
              style={{
                perspective: "1200px",
                border: dark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(232,224,218,0.4)",
              }}
            >
              {/* Ambient glow - warm for light mode */}
              <div ref={ambientGlowRef} className={`absolute w-[55%] h-[55%] rounded-full blur-[50px] ${
                dark ? 'bg-white/5' : 'bg-amber-200/40'
              }`} />

              {/* Main product image */}
              <img
                ref={imageRef}
                src={productImages[displayedImage] || productImages[selectedVariant.capacity]}
                alt={`${product.name} - ${selectedVariant.capacity}`}
                className="w-[80%] h-[80%] object-contain relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
                style={{ transformStyle: "preserve-3d" }}
              />

              {/* Reflection - softer for light mode */}
              <img
                ref={reflectionRef}
                src={productImages[displayedImage] || productImages[selectedVariant.capacity]}
                alt=""
                aria-hidden="true"
                className={`absolute bottom-[2%] left-[10%] w-[80%] object-contain z-[5] pointer-events-none ${
                  dark ? 'opacity-[0.06]' : 'opacity-[0.04]'
                }`}
                style={{
                  transform: "scaleY(-1)",
                  transformOrigin: "bottom",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)",
                  filter: "blur(3px)",
                }}
              />

              {/* Glass border - subtle for light mode */}
              <div className={`absolute inset-0 rounded-[1.5rem] pointer-events-none ring-1 ${
                dark ? 'ring-white/[0.04]' : 'ring-[#e8e0da]/30'
              }`} />
            </div>

            {/* Floating product cards */}
            {floatingCards.map((card, i) => (
              <FloatingProductCard key={i} {...card} />
            ))}

            {/* Glassmorphism action buttons */}
            <div className="absolute top-5 right-5 flex flex-col gap-2 z-20">
              <button
                ref={wishlistRef}
                onClick={handleWishlist}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer group hover:scale-110 ${
                  dark
                    ? 'glass dark:bg-white/5 backdrop-blur-xl border-white/10'
                    : 'bg-white/70 backdrop-blur-xl border-[#e8e0da]/30 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]'
                }`}
              >
                <Heart
                  size={16}
                  className={`transition-all duration-300 ${
                    isWishlisted
                      ? 'fill-[#e8572a] text-[#e8572a] drop-shadow-[0_0_8px_rgba(232,87,42,0.5)]'
                      : dark ? 'text-gray-400 group-hover:text-white' : 'text-[#b8aa9e] group-hover:text-[#8a7a6e]'
                  }`}
                />
              </button>
              <button
                ref={shareRef}
                onClick={handleShare}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer group hover:scale-110 ${
                  dark
                    ? 'glass dark:bg-white/5 backdrop-blur-xl border-white/10'
                    : 'bg-white/70 backdrop-blur-xl border-[#e8e0da]/30 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]'
                }`}
              >
                <Share2 size={16} className={`transition-colors duration-300 ${
                  dark ? 'text-gray-400 group-hover:text-white' : 'text-[#b8aa9e] group-hover:text-[#8a7a6e]'
                }`} />
              </button>
            </div>
          </div>

          {/* ── Right: Product Details ── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">

            {/* Category */}
            <span className={`inline-block label-premium px-4 py-1.5 rounded-full border ${
              dark
                ? 'text-gray-500 border-white/[0.06] bg-white/[0.02]'
                : 'text-[#8a7a6e] border-[#e8e0da]/60 bg-[#f8f5f2]'
            }`}>
              {product.collection}
            </span>

            {/* Title */}
            <h2 className={`text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] ${
              dark ? 'text-white' : 'text-[#1a1410]'
            }`}>
              {product.name}
            </h2>

            {/* Divider after title */}
            <div className={`h-px w-1/2 ${dark ? 'bg-white/10' : 'bg-[#1a1410]/15'}`} />

            {/* Rating */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className={`text-sm ${dark ? 'text-gray-500' : 'text-[#8a7a6e]'}`}>4.8 <span className={dark ? 'text-gray-600' : 'text-[#b8aa9e]'}>(128 reviews)</span></span>
            </div>

            {/* Description */}
            <p className={`text-[15px] leading-relaxed max-w-lg ${dark ? 'text-gray-400' : 'text-[#8a7a6e]'}`}>
              {product.description}
            </p>

            {/* Price */}
            <div ref={priceRef} className="flex items-baseline gap-3 flex-wrap">
              <span className={`text-[1.8rem] sm:text-[2rem] font-light tracking-tight ${
                dark ? 'text-white' : 'text-[#1a1410]'
              }`}>
                {formatPrice(selectedVariant.price)}
              </span>
              <span className={`text-sm line-through ${dark ? 'text-gray-600' : 'text-[#b8aa9e]'}`}>
                {formatPrice(selectedVariant.price * 1.2)}
              </span>
              <span className="text-[11px] font-medium text-[#e8572a] bg-[#e8572a]/[0.08] px-2.5 py-1 rounded-full">
                Save 20%
              </span>
            </div>

            {/* Stock */}
            <div ref={metaRef} className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full ${
                dark
                  ? 'bg-white/[0.04] text-gray-400'
                  : 'bg-[#f0ebe7] text-[#8a7a6e]'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                </span>
                {inStock ? `${selectedVariant.stock} in stock` : "Out of stock"}
              </span>
              <span className={`text-xs ${dark ? 'text-gray-600' : 'text-[#b8aa9e]'}`}>Free shipping</span>
            </div>

            {/* Capacity Selector */}
            <div className="pt-2">
              {/* Divider before capacity */}
              <div className={`h-px w-full mb-4 ${dark ? 'bg-white/10' : 'bg-[#1a1410]/15'}`} />
              <div className="flex items-center justify-between mb-3">
                <p className={`label-premium ${dark ? 'text-gray-500' : 'text-[#8a7a6e]'}`}>Capacity</p>
                <span className={`text-[11px] ${dark ? 'text-gray-600' : 'text-[#b8aa9e]'}`}>Select storage</span>
              </div>
              <div className="flex gap-2">
                {product.variants.map((variant, i) => (
                  <button
                    key={variant.capacity}
                    ref={(el) => (variantRefs.current[i] = el)}
                    onClick={(e) => handleVariantSelect(variant, e)}
                    className={`relative overflow-hidden flex-1 py-3 rounded-xl text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                      selectedVariant.capacity === variant.capacity
                        ? dark
                          ? 'bg-white text-black border border-white'
                          : 'bg-black text-white border border-black'
                        : dark
                          ? 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:border-white/[0.12] hover:text-gray-300'
                          : 'bg-white text-black border border-black hover:bg-gray-100'
                    }`}
                  >
                    {variant.capacity}
                  </button>
                ))}
              </div>
              {/* Divider after capacity */}
              <div className={`h-px w-full mt-4 ${dark ? 'bg-white/10' : 'bg-[#1a1410]/15'}`} />
            </div>

            {/* Quantity + Add to Cart */}
            <div ref={quantityRef} className="flex gap-3 pt-1">
              {/* Neumorphic Quantity */}
              <div className={`flex items-center rounded-xl overflow-hidden ${
                dark
                  ? 'bg-white/[0.03] border border-white/[0.06]'
                  : 'bg-[#f5f1ee] border border-[#e8e0da]/40'
              }`}>
                <button
                  onClick={(e) => changeQuantity(-1, e)}
                  disabled={quantity <= 1}
                  className={`w-11 h-[52px] flex items-center justify-center transition-all duration-200 cursor-pointer rounded-l-xl ${
                    dark
                      ? 'text-gray-500 disabled:text-gray-700 hover:bg-white/[0.04]'
                      : 'text-[#b8aa9e] disabled:text-[#e8e0da] hover:bg-[#ede7e2]'
                  }`}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                <span className={`w-9 text-center text-sm font-medium tabular-nums ${dark ? 'text-white' : 'text-[#1a1410]'}`}>{quantity}</span>
                <button
                  onClick={(e) => changeQuantity(1, e)}
                  disabled={quantity >= selectedVariant.stock}
                  className={`w-11 h-[52px] flex items-center justify-center transition-all duration-200 cursor-pointer rounded-r-xl ${
                    dark
                      ? 'text-gray-500 disabled:text-gray-700 hover:bg-white/[0.04]'
                      : 'text-[#b8aa9e] disabled:text-[#e8e0da] hover:bg-[#ede7e2]'
                  }`}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                ref={buttonRef}
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`add-to-cart-btn flex-1 h-[52px] rounded-xl text-[13px] font-semibold transition-all relative overflow-hidden cursor-pointer tracking-wide ${
                  !inStock
                    ? dark ? "bg-gray-700 cursor-not-allowed text-white" : "bg-[#d4c8be] cursor-not-allowed text-white"
                    : added
                    ? "bg-green-500 text-white"
                    : ""
                }`}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {added ? (
                    <>
                      <Check size={16} strokeWidth={3} />
                      <span className="hidden sm:inline">Added to cart</span>
                      <span className="sm:hidden">Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span className="hidden sm:inline">Add to cart · {formatPrice(selectedVariant.price * quantity)}</span>
                      <span className="sm:hidden">{formatPrice(selectedVariant.price * quantity)}</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Feature Cards - Glass style */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {product.features.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  ref={(el) => (featureRefs.current[i] = el)}
                  className={`flex items-center gap-2.5 text-[12px] cursor-default group rounded-xl px-3 py-2.5 transition-all duration-300 ${
                    dark
                      ? 'hover:bg-white/[0.03] text-gray-500'
                      : 'hover:bg-[#f5f1ee] text-[#8a7a6e]'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                    dark
                      ? 'bg-white/[0.03] group-hover:bg-white/[0.06]'
                      : 'bg-[#f5f1ee] group-hover:bg-[#ede7e2]'
                  }`}>
                    <Icon size={13} strokeWidth={1.5} className={`transition-colors duration-300 ${
                      dark
                        ? 'text-gray-600 group-hover:text-gray-400'
                        : 'text-[#b8aa9e] group-hover:text-[#8a7a6e]'
                    }`} />
                  </div>
                  <span className={`font-medium ${dark ? 'text-gray-400' : 'text-[#5a4f48]'}`}>{label}</span>
                </div>
              ))}
            </div>

            {/* Divider + Tags */}
            <div className={`border-t ${dark ? 'border-white/[0.04]' : 'border-[#e8e0da]/40'}`}>
              <div className="pt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] px-3 py-1 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                      dark
                        ? 'bg-white/[0.03] text-gray-600 border border-white/[0.04] hover:bg-white/[0.06] hover:text-gray-400 hover:border-white/[0.08]'
                        : 'bg-[#f5f1ee] text-[#b8aa9e] border border-[#e8e0da]/40 hover:bg-[#ede7e2] hover:text-[#8a7a6e] hover:border-[#d4c8be]'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .add-to-cart-btn {
          background: #000;
          color: #fff;
        }

        html.dark .add-to-cart-btn {
          background: #fff;
          color: #000;
        }

        .add-to-cart-btn:hover:not(:disabled):not(.bg-green-500) {
          background: #f97316;
          color: #fff;
        }

        .add-to-cart-btn:active:not(:disabled):not(.bg-green-500) {
          background: #000;
          color: #fff;
        }

        html.dark .add-to-cart-btn:active:not(:disabled):not(.bg-green-500) {
          background: #fff;
          color: #000;
        }
      `}</style>
    </section>
  );
}