import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { ScrollReveal, useInView } from "../hooks/useInView";
import gsap from "gsap";

import img1 from "../assets/6.jpg";
import img2 from "../assets/4.jpg";
import img3 from "../assets/9.jpg";
import img4 from "../assets/12.jpg";
import img5 from "../assets/13.jpg";

const images = [img1, img2, img3, img4, img5];

export default function ProductGallery() {
  const [selected, setSelected] = useState(0);
  const [ref] = useInView();
  const mainImageRef = useRef(null);
  const mainBoxRef = useRef(null);
  const prevSelected = useRef(0);

  // Smooth GSAP crossfade on image change
  useLayoutEffect(() => {
    if (!mainImageRef.current || prevSelected.current === selected) return;
    const img = mainImageRef.current;
    const tl = gsap.timeline();
    tl.to(img, {
      opacity: 0,
      scale: 0.92,
      filter: "blur(8px)",
      duration: 0.3,
      ease: "power2.in",
    })
    .call(() => {
      // src is controlled by React, just animate back
    })
    .to(img, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power3.out",
    });
    prevSelected.current = selected;
    return () => tl.kill();
  }, [selected]);

  // Mouse parallax on main image
  useEffect(() => {
    const box = mainBoxRef.current;
    const img = mainImageRef.current;
    if (!box || !img) return;

    const onMove = (e) => {
      const rect = box.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = (e.clientX - cx) / rect.width;
      const my = (e.clientY - cy) / rect.height;
      gsap.to(img, {
        rotateY: mx * 8,
        rotateX: -my * 5,
        x: mx * 10,
        y: my * 8,
        duration: 0.8,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(img, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.4)",
      });
    };

    box.addEventListener("mousemove", onMove);
    box.addEventListener("mouseleave", onLeave);
    return () => {
      box.removeEventListener("mousemove", onMove);
      box.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleSelect = (index) => {
    if (index === selected) return;
    setSelected(index);
  };

  return (
    <section className="w-full bg-white py-12">
      <div ref={ref} className="w-full mx-auto px-4 sm:px-6 lg:px-20">

        {/* Main Image */}
        <ScrollReveal animation="anim-blur">
          <div
            ref={mainBoxRef}
            className="w-full h-[300px] sm:h-[420px] md:h-[560px] lg:h-[620px] bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
            style={{ perspective: "1000px" }}
          >
            <img
              ref={mainImageRef}
              src={images[selected]}
              alt="Product"
              className="w-full h-full object-contain p-4 sm:p-8"
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="w-full my-6">
          <div className="h-px bg-gray-300" />
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center items-center gap-3 flex-wrap">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`gallery-thumb ${selected === index ? "active" : ""}`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="gallery-thumb-img"
              />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-thumb {
          width: 100px;
          height: 65px;
          border-radius: 12px;
          border: 2px solid transparent;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .gallery-thumb:hover {
          border-color: #999;
          transform: scale(1.05);
        }

        .gallery-thumb.active {
          border-color: #111;
        }

        .gallery-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ===== DARK MODE ===== */
        html.dark .gallery-thumb.active {
          border-color: #fff;
        }

        html.dark .gallery-thumb:hover {
          border-color: #666;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 640px) {
          .gallery-thumb {
            width: 70px;
            height: 50px;
            border-radius: 10px;
          }
        }

        @media (min-width: 768px) {
          .gallery-thumb {
            width: 140px;
            height: 90px;
          }
        }
      `}</style>
    </section>
  );
}
