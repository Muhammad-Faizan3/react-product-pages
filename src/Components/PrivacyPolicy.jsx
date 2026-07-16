import { useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    title: "Information We Collect",
    content: "When you use our website, we may collect the following information:",
    details: [
      "Full Name",
      "Email Address",
      "Phone Number",
      "Shipping & Billing Address",
      "Payment Information (processed securely through trusted payment providers)",
      "Order History",
      "Device Information (browser type, IP address, operating system)",
      "Website usage data through cookies and analytics tools",
    ],
  },
  {
    title: "How We Use Your Information",
    content: "We use your information to:",
    details: [
      "Process and deliver your orders",
      "Verify and confirm purchases",
      "Provide customer support",
      "Respond to your inquiries",
      "Send order updates and shipping notifications",
      "Improve our website, products, and services",
      "Prevent fraud and maintain website security",
      "Send promotional emails and special offers (only if you choose to receive them)",
    ],
  },
  {
    title: "Payment Security",
    content: "We do not store your complete payment card information on our servers. Payments are processed through secure third-party payment gateways using industry-standard encryption technologies.",
    details: [],
  },
  {
    title: "Shipping Information",
    content: "Your shipping information is used solely to deliver your order accurately and efficiently. We only share the necessary details with trusted shipping and logistics partners.",
    details: [],
  },
  {
    title: "Cookies",
    content: "Our website uses cookies to:",
    details: [
      "Remember your preferences",
      "Keep products in your shopping cart",
      "Improve website performance",
      "Analyze visitor behavior",
      "Provide a better shopping experience",
    ],
    note: "You can disable cookies in your browser settings; however, some website features may not function properly.",
  },
  {
    title: "Data Protection",
    content: "We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, misuse, loss, or disclosure.",
    details: [],
  },
  {
    title: "Third-Party Services",
    content: "We may use trusted third-party services for:",
    details: [
      "Payment processing",
      "Shipping and delivery",
      "Website analytics",
      "Email communication",
    ],
    note: "These providers only receive the information necessary to perform their services and are expected to protect your data.",
  },
  {
    title: "Your Rights",
    content: "You have the right to:",
    details: [
      "Access your personal information",
      "Correct inaccurate information",
      "Request deletion of your data where legally permitted",
      "Unsubscribe from promotional emails at any time",
      "Contact us regarding any privacy concerns",
    ],
  },
  {
    title: "Product Information",
    content: "We strive to provide accurate descriptions and specifications for the NovaDrive 2-in-1 Flash Drive, including storage capacity, compatibility, features, and pricing. Product images are for illustration purposes and actual products may vary slightly.",
    details: [],
  },
  {
    title: "Children's Privacy",
    content: "Our website is not intended for individuals under the age of 13. We do not knowingly collect personal information from children.",
    details: [],
  },
  {
    title: "Changes to This Privacy Policy",
    content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page along with the updated effective date.",
    details: [],
  },
  {
    title: "Contact Us",
    content: "If you have any questions regarding this Privacy Policy or how your information is handled, please contact us through our Contact Us page or the support email provided on our website.",
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

export default function PrivacyPolicy() {
  const pageRef = useRef(null);
  const activeSection = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 })
        .fromTo(".hero-icon", { scale: 0, rotate: -180, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: "back.out(3)" }, "-=0.3")
        .fromTo(".hero-title", { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, "-=0.5")
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-meta", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, "-=0.2");

      // Floating icon
      gsap.to(".hero-icon", { y: -8, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.5 });

      // Sections stagger
      gsap.utils.toArray(".policy-section").forEach((sec) => {
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

      // Footer CTA
      gsap.fromTo(".footer-cta", { opacity: 0, y: 30, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".footer-cta", start: "top 85%", toggleActions: "play none none none" },
      });

      // ScrollTrigger to track active section
      gsap.utils.toArray(".policy-section").forEach((sec, i) => {
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
      {/* Background decoration */}
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
            <span className="text-white text-3xl sm:text-4xl font-bold" style={{ lineHeight: 1 }}>P</span>
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>

          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Privacy Policy
          </h1>

          <p className="hero-sub text-sm sm:text-base text-gray-400 mt-4 sm:mt-5 max-w-lg mx-auto leading-relaxed">
            Welcome to NovaDrive. Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-medium text-gray-500">SSL Encrypted</span>
            </div>
            <div className="hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-medium text-gray-500">GDPR Compliant</span>
            </div>
            <div className="hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-medium text-gray-500">Transparent Practices</span>
            </div>
          </div>

          <p className="hero-meta text-[11px] text-gray-300 mt-4">
            Effective Date: July 14, 2026
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex gap-12 xl:gap-16">
          <TableOfContents activeSection={activeSection.current} />

          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">
            {/* Policy Sections */}
            {SECTIONS.map((section, i) => {
              const hasDetails = section.details && section.details.length > 0;
              return (
                <div key={i} id={`section-${i}`} className="policy-section scroll-mt-24 mb-8 sm:mb-10">
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-500">
                    {/* Section Header */}
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">Section {String(i + 1).padStart(2, "0")}</span>
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight mt-0.5">{section.title}</h2>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 sm:mb-5">{section.content}</p>

                    {/* Details List */}
                    {hasDetails && (
                      <div className="space-y-2">
                        {section.details.map((detail, j) => (
                          <div key={j} className="detail-item flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors duration-300 group">
                            <span className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Note */}
                    {section.note && (
                      <div className="mt-4 p-3 sm:p-4 rounded-xl bg-orange-50/50 border border-orange-100/50">
                        <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">{section.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Final Note */}
            <div className="policy-section mb-8 sm:mb-10">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 sm:p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg mx-auto">
                    By using the NovaDrive website and purchasing our products, you acknowledge that you have read and agree to this Privacy Policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="footer-cta bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100 p-6 sm:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-4 shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-2">Questions About Privacy?</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto mb-5 leading-relaxed">
                If you have any questions regarding this Privacy Policy or how your information is handled, please contact us.
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
