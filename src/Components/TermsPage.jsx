import { useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content: "By accessing and using the NovaDrive website and purchasing our products, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or purchase our products.",
    details: [],
  },
  {
    title: "Products & Descriptions",
    content: "We strive to provide accurate descriptions and specifications for the NovaDrive 2-in-1 Flash Drive, including storage capacity, compatibility, features, and pricing. However, we do not warrant that product descriptions, pricing, or other content on the site is error-free, complete, or current.",
    details: [
      "Product images are for illustration purposes and actual products may vary slightly",
      "Storage capacity listed is based on 1MB = 1,000,000 bytes; actual usable capacity may be lower",
      "Compatibility may vary depending on device and operating system",
      "Prices are listed in Pakistani Rupees (PKR) and are subject to change without notice",
      "We reserve the right to modify or discontinue any product at any time",
    ],
  },
  {
    title: "Pricing & Payment",
    content: "All prices are listed in Pakistani Rupees (PKR) unless otherwise specified. We reserve the right to change prices at any time without prior notice. Payment must be completed at the time of order placement.",
    details: [
      "Accepted payment methods: Credit/Debit Card, JazzCash, Cash on Delivery (COD)",
      "All transactions are processed through secure third-party payment gateways",
      "We do not store your complete payment card information",
      "COD orders require full payment upon delivery",
      "In case of pricing errors, we reserve the right to cancel the order and issue a full refund",
    ],
  },
  {
    title: "Shipping & Delivery",
    content: "We aim to process and ship all orders promptly. Delivery times may vary depending on your location and the shipping method selected at checkout.",
    details: [
      "Standard delivery within Pakistan: 3-5 business days",
      "Express delivery within Pakistan: 1-2 business days",
      "Delivery times are estimates and not guaranteed",
      "We are not responsible for delays caused by shipping carriers or customs processing",
      "Risk of loss and title for items pass to you upon delivery to the carrier",
      "Shipping charges are calculated at checkout and are non-refundable",
    ],
  },
  {
    title: "Returns & Refunds",
    content: "We want you to be completely satisfied with your purchase. If you are not satisfied, you may return the product under the following conditions:",
    details: [
      "Returns must be initiated within 7 days of delivery",
      "Product must be in its original, unused condition with all packaging intact",
      "Opened or used products are not eligible for return unless defective",
      "Refunds are processed within 5-7 business days after we receive the returned item",
      "Original shipping charges are non-refundable",
      "Return shipping costs are borne by the customer unless the product is defective",
      "Refunds will be issued to the original payment method",
    ],
  },
  {
    title: "Warranty",
    content: "All NovaDrive products come with a limited manufacturer warranty covering defects in materials and workmanship under normal use.",
    details: [
      "Standard warranty period: 12 months from the date of purchase",
      "Extended warranty available for Pro series products",
      "Warranty does not cover damage from misuse, accidents, or unauthorized modifications",
      "Water damage, physical damage, and electrical surge damage are not covered",
      "Warranty claims require proof of purchase (order confirmation or receipt)",
      "We reserve the right to repair, replace, or refund at our discretion",
    ],
  },
  {
    title: "Prohibited Uses",
    content: "You agree not to use our website or products for any unlawful purpose or in any way that could damage, disable, or impair our services.",
    details: [
      "Reproducing, duplicating, or copying any content from our website",
      "Using our products for any illegal or unauthorized purpose",
      "Attempting to interfere with the proper working of our website",
      "Transmitting any harmful code, viruses, or malicious software",
      "Attempting to gain unauthorized access to our systems or user accounts",
      "Reselling our products without written authorization from NovaDrive",
    ],
  },
  {
    title: "User Accounts",
    content: "When you create an account with us, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    details: [
      "You must provide accurate and complete registration information",
      "You are responsible for safeguarding your password",
      "You must notify us immediately of any unauthorized use of your account",
      "We reserve the right to suspend or terminate accounts that violate these terms",
      "You may not use another person's account without their express permission",
    ],
  },
  {
    title: "Limitation of Liability",
    content: "To the maximum extent permitted by law, NovaDrive shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our products or website.",
    details: [
      "Our total liability shall not exceed the amount paid for the product",
      "We are not liable for data loss, business interruption, or loss of profits",
      "We are not responsible for third-party services or products",
      "Product liability is limited to the original purchase price",
      "We are not liable for damages arising from misuse of our products",
    ],
  },
  {
    title: "Intellectual Property",
    content: "All content on this website, including text, graphics, logos, images, trademarks, and software, is the property of NovaDrive and is protected by applicable intellectual property laws.",
    details: [
      "NovaDrive name, logo, and branding are registered trademarks",
      "Product designs and technology are protected by intellectual property rights",
      "Unauthorized use of our intellectual property is strictly prohibited",
      "You may not copy, reproduce, or distribute any content without written permission",
    ],
  },
  {
    title: "Changes to Terms",
    content: "We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting on this page. Your continued use of the website constitutes acceptance of the updated terms.",
    details: [],
  },
  {
    title: "Contact Information",
    content: "If you have any questions about these Terms and Conditions, please contact us through our Contact Us page or via the support email provided on our website.",
    details: [],
  },
];

function TableOfContents({ activeSection }) {
  return (
    <div className="hidden lg:block sticky top-24 w-56 shrink-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">On this page</p>
      <nav className="space-y-1">
        {SECTIONS.map((s, i) => {
          return (
            <a
              key={i}
              href={`#section-${i}`}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 group ${
                activeSection === i
                  ? "bg-gray-900 text-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
                  : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span className="truncate">{s.title}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default function TermsPage() {
  const pageRef = useRef(null);
  const activeSection = useRef(0);

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

      gsap.utils.toArray(".terms-section").forEach((sec) => {
        gsap.fromTo(sec, { opacity: 0, y: 40, filter: "blur(6px)" }, {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 85%", toggleActions: "play none none none" },
        });

        const items = sec.querySelectorAll(".detail-item");
        if (items.length) {
          gsap.fromTo(items, { opacity: 0, x: -20 }, {
            opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power2.out",
            scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none none" },
          });
        }
      });

      gsap.fromTo(".footer-cta", { opacity: 0, y: 30, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".footer-cta", start: "top 85%", toggleActions: "play none none none" },
      });

      gsap.utils.toArray(".terms-section").forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => { activeSection.current = i; updateToc(i); },
          onEnterBack: () => { activeSection.current = i; updateToc(i); },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const updateToc = (idx) => {
    const links = document.querySelectorAll("nav a");
    links.forEach((a, i) => {
      if (i === idx) {
        a.className = "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 group bg-gray-900 text-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]";
      } else {
        a.className = "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 group text-gray-400 hover:text-gray-900 hover:bg-gray-50";
      }
    });
  };

  return (
    <section
      ref={pageRef}
      className="w-full bg-gradient-to-b from-white via-gray-50/30 to-white min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-orange-50/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[120px] py-10 sm:py-14 md:py-20 lg:py-28">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="hero-badge inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 bg-gray-100 px-3 sm:px-4 py-1.5 rounded-full mb-5 sm:mb-6">
            Legal
          </span>

          <div className="hero-icon relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gray-900 to-black mb-6 sm:mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <span className="text-white text-3xl sm:text-4xl font-bold">T</span>
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>

          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Terms & Conditions
          </h1>

          <p className="hero-sub text-sm sm:text-base text-gray-400 mt-4 sm:mt-5 max-w-lg mx-auto leading-relaxed">
            Please read these terms carefully before using our website or purchasing NovaDrive products.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-medium text-gray-500">Fair Terms</span>
            </div>
            <div className="hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-medium text-gray-500">Secure Transactions</span>
            </div>
            <div className="hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-medium text-gray-500">Transparent Policies</span>
            </div>
          </div>

          <p className="hero-meta text-[11px] text-gray-300 mt-4">
            Last Updated: July 14, 2026
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex gap-12 xl:gap-16">
          <TableOfContents activeSection={activeSection.current} />

          <div className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">
            {SECTIONS.map((section, i) => {
              const hasDetails = section.details && section.details.length > 0;
              return (
                <div key={i} id={`section-${i}`} className="terms-section scroll-mt-24 mb-8 sm:mb-10">
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-500">
                    <div className="mb-4 sm:mb-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">Section {String(i + 1).padStart(2, "0")}</span>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight mt-0.5">{section.title}</h2>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed mb-4 sm:mb-5">{section.content}</p>

                    {hasDetails && (
                      <div className="space-y-2">
                        {section.details.map((detail, j) => (
                          <div key={j} className="detail-item flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors duration-300 group">
                            <span className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Final Note */}
            <div className="terms-section mb-8 sm:mb-10">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 sm:p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg mx-auto">
                    By using the NovaDrive website and purchasing our products, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="footer-cta bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100 p-6 sm:p-8 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-2">Questions About These Terms?</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto mb-5 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us and we will be happy to help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-black transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:-translate-y-0.5"
                >
                  Contact Us
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:text-gray-900 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
