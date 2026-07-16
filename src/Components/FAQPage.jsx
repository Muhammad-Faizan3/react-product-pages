import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from '../App';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "What devices are compatible with NovaDrive?",
    a: "NovaDrive supports iPhone, iPad, and USB-A compatible devices.",
  },
  {
    q: "Which storage capacities are available?",
    a: "We offer 16GB, 32GB, 64GB, 128GB, and 256GB models.",
  },
  {
    q: "Does the flash drive support USB 3.0?",
    a: "Yes. NovaDrive features high-speed USB 3.0 for faster file transfers.",
  },
  {
    q: "Is shipping free?",
    a: "Yes, free shipping is available on eligible orders.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders arrive within 2–7 business days, depending on your location.",
  },
  {
    q: "Can I return my order?",
    a: "Yes. Eligible products can be returned within our stated return period. Please refer to our Return & Refund Policy for details.",
  },
  {
    q: "Does the product include a warranty?",
    a: "Yes. Every NovaDrive 2-in-1 Flash Drive comes with a 1-Year Limited Warranty against manufacturing defects.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order is shipped, you'll receive a tracking number via email or SMS (where available).",
  },
  {
    q: "Is my payment secure?",
    a: "Yes. All payments are processed through secure payment gateways using encrypted technology.",
  },
  {
    q: "How do I contact customer support?",
    a: "You can reach us through the Contact Us page or by using the support email listed on our website. Our team typically responds within one business day.",
  },
];

function FaqItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const itemRef = useRef(null);
  const { dark } = useTheme();

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(itemRef.current?.querySelector(".faq-chevron"), { rotate: 180, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(itemRef.current?.querySelector(".faq-chevron"), { rotate: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className={`faq-item ${dark ? 'bg-[#141414]' : 'bg-white'} rounded-2xl border transition-all duration-500 overflow-hidden ${
        isOpen ? `${dark ? 'border-white/12' : 'border-gray-200'} shadow-[0_8px_30px_rgba(0,0,0,0.06)]` : `${dark ? 'border-white/8' : 'border-gray-100'} hover:${dark ? 'border-white/12' : 'border-gray-200'} hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]`
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left cursor-pointer group"
      >
        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
          isOpen
            ? "bg-gradient-to-br from-gray-900 to-black shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
            : `${dark ? 'bg-[#2A2A2A]' : 'bg-gray-100'} group-hover:${dark ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`
        }`}>
          <span className={`text-sm font-bold transition-colors duration-500 ${isOpen ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`}>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 block mb-0.5">Question {String(index + 1).padStart(2, "0")}</span>
          <h3 className={`text-sm sm:text-base font-bold ${dark ? 'text-white' : 'text-gray-900'} tracking-tight leading-snug`}>{faq.q}</h3>
        </div>
        <span className={`faq-chevron shrink-0 transition-colors duration-300 text-lg ${isOpen ? `${dark ? 'text-white' : 'text-gray-900'}` : "text-gray-300 group-hover:text-gray-500"}`}>∨</span>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-[60px] sm:pl-[68px]">
          <div className={`p-3 sm:p-4 rounded-xl ${dark ? 'bg-[#1E1E1E]' : 'bg-gray-50/80'} border ${dark ? 'border-white/8' : 'border-gray-100/50'}`}>
            <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const pageRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const { dark } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 })
        .fromTo(".hero-icon", { scale: 0, rotate: -180, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: "back.out(3)" }, "-=0.3")
        .fromTo(".hero-title", { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, "-=0.5")
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-meta", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, "-=0.2");

      gsap.to(".hero-icon", { y: -8, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.5 });

      gsap.utils.toArray(".faq-item").forEach((item, i) => {
        gsap.fromTo(item, { opacity: 0, y: 30, filter: "blur(4px)" }, {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5,
          ease: "power3.out",
          delay: i * 0.04,
          scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
        });
      });

      gsap.fromTo(".footer-cta", { opacity: 0, y: 30, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".footer-cta", start: "top 85%", toggleActions: "play none none none" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pageRef}
      className={`w-full ${dark ? 'bg-[#0A0A0A]' : 'bg-gradient-to-b from-white via-gray-50/30 to-white'} min-h-screen relative overflow-hidden`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-orange-50/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[120px] py-10 sm:py-14 md:py-20 lg:py-28">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className={`hero-badge inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 ${dark ? 'bg-[#2A2A2A]' : 'bg-gray-100'} px-3 sm:px-4 py-1.5 rounded-full mb-5 sm:mb-6`}>
            Support
          </span>

          <div className="hero-icon relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gray-900 to-black mb-6 sm:mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <span className="text-white text-3xl sm:text-4xl font-bold">?</span>
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>

          <h1 className={`hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${dark ? 'text-white' : 'text-gray-900'} tracking-tight leading-[1.1]`}>
            Frequently Asked Questions
          </h1>

          <p className="hero-sub text-sm sm:text-base text-gray-400 mt-4 sm:mt-5 max-w-lg mx-auto leading-relaxed">
            Find quick answers to the most common questions about NovaDrive products, shipping, and support.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className={`hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full ${dark ? 'bg-[#1E1E1E]' : 'bg-gray-50'} border ${dark ? 'border-white/8' : 'border-gray-100'}`}>
              <span className="text-[11px] font-medium text-gray-500">Quick Answers</span>
            </div>
            <div className={`hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full ${dark ? 'bg-[#1E1E1E]' : 'bg-gray-50'} border ${dark ? 'border-white/8' : 'border-gray-100'}`}>
              <span className="text-[11px] font-medium text-gray-500">10 FAQs</span>
            </div>
            <div className={`hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full ${dark ? 'bg-[#1E1E1E]' : 'bg-gray-50'} border ${dark ? 'border-white/8' : 'border-gray-100'}`}>
              <span className="text-[11px] font-medium text-gray-500">24hr Support</span>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Still Have Questions */}
        <div className={`footer-cta ${dark ? 'bg-[#141414]' : 'bg-gradient-to-br from-gray-50 to-gray-100/50'} rounded-2xl border ${dark ? 'border-white/8' : 'border-gray-100'} p-6 sm:p-8 text-center max-w-3xl mx-auto`}>
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-4 shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
            <span className="text-white text-lg">✉</span>
          </div>
          <h3 className={`text-lg sm:text-xl font-bold ${dark ? 'text-white' : 'text-gray-900'} tracking-tight mb-2`}>Still Have Questions?</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-5 leading-relaxed">
            Can't find what you're looking for? Our support team is here to help. Reach out and we will respond within one business day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-black transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:-translate-y-0.5"
            >
              Contact Support
            </a>
            <Link
              to="/"
              className={`inline-flex items-center gap-2 px-5 py-2.5 ${dark ? 'bg-[#141414]' : 'bg-white'} ${dark ? 'text-gray-300' : 'text-gray-700'} text-sm font-semibold rounded-xl border ${dark ? 'border-white/12' : 'border-gray-200'} hover:${dark ? 'border-white/20' : 'border-gray-300'} hover:text-gray-900 transition-all duration-300 hover:-translate-y-0.5`}
            >
              Back to Home
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
