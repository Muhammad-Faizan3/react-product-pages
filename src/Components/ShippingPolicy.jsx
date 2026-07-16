import { useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    title: "Order Processing",
    content: "All orders are processed within 1-2 business days after payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day.",
    details: [
      "Order confirmation email is sent immediately after purchase",
      "Payment verification takes 1-2 hours for online payments",
      "COD orders are confirmed via phone call within 24 hours",
      "Processing time may be longer during promotional periods",
      "We reserve the right to cancel orders with incorrect pricing",
    ],
  },
  {
    title: "Domestic Shipping (Pakistan)",
    content: "We ship to all major cities and remote areas across Pakistan through our trusted logistics partners.",
    details: [
      "Standard Delivery: 3-5 business days",
      "Express Delivery: 1-2 business days",
      "Remote areas: 5-7 business days",
      "All shipments are tracked with real-time updates",
      "Free shipping on orders above PKR 10,000",
    ],
    table: [
      { method: "Standard", time: "3-5 business days", cost: "PKR 500" },
      { method: "Express", time: "1-2 business days", cost: "PKR 1,000" },
      { method: "Free (Orders above 10K)", time: "3-5 business days", cost: "Free" },
    ],
  },
  {
    title: "International Shipping",
    content: "Currently, NovaDrive ships within Pakistan only. We are working to expand our shipping coverage to international destinations. Sign up for our newsletter to be notified when international shipping becomes available.",
    details: [
      "International shipping coming soon",
      "Join our waitlist for updates on international delivery",
      "Customs and import duties will be the buyer's responsibility",
      "International shipping rates will be calculated at checkout",
    ],
  },
  {
    title: "Shipping Areas & Coverage",
    content: "We deliver to all addresses within Pakistan, including major cities, rural areas, and remote locations. Some exclusions may apply for areas with security restrictions.",
    details: [
      "Major cities: Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta",
      "Secondary cities: Sialkot, Gujranwala, Abbottabad, Mardan, Sukkur, Larkana",
      "Remote areas: Delivery may take additional 2-3 business days",
      "PO Box addresses are not accepted",
      "Complete and accurate address must be provided at checkout",
    ],
  },
  {
    title: "Order Tracking",
    content: "Every order comes with a tracking number that allows you to monitor your package from dispatch to delivery. Tracking information is sent via email and SMS.",
    details: [
      "Tracking number is provided within 24 hours of dispatch",
      "Real-time tracking updates via email and SMS",
      "Track your order on our website or the carrier's portal",
      "Delivery status notifications at each stage",
      "Contact our support team for tracking assistance",
    ],
  },
  {
    title: "Payment Methods",
    content: "We accept multiple payment methods for your convenience. All online transactions are processed through secure, encrypted payment gateways.",
    details: [
      "Credit/Debit Cards (Visa, MasterCard, UnionPay)",
      "JazzCash mobile wallet",
      "Cash on Delivery (COD) — available for orders up to PKR 50,000",
      "Bank transfer — for bulk orders only",
      "All payments are processed in Pakistani Rupees (PKR)",
    ],
  },
  {
    title: "Cash on Delivery (COD)",
    content: "COD is available for orders within Pakistan. You can pay in cash when your order is delivered to your doorstep.",
    details: [
      "Available for orders up to PKR 50,000",
      "COD orders require phone verification before dispatch",
      "Exact change is appreciated — delivery rider may not carry change",
      "If COD payment is refused, the order will be cancelled",
      "COD charges: PKR 100 additional fee applies",
      "Repeat COD refusals may result in COD privilege being revoked",
    ],
  },
  {
    title: "Shipping Insurance",
    content: "All shipments are insured against loss and damage during transit. In case of any issues, we will reship the product or issue a full refund.",
    details: [
      "Free shipping insurance on all orders",
      "Covers damage, loss, and theft during transit",
      "Report any damage within 48 hours of delivery",
      "Provide photos of damaged packaging and product",
      "Replacement or refund processed within 3-5 business days",
    ],
  },
  {
    title: "Returns & Exchanges",
    content: "If you need to return or exchange a product, please follow our return policy guidelines. Returns must be initiated within 7 days of delivery.",
    details: [
      "Initiate return within 7 days of delivery",
      "Product must be in original, unused condition with packaging",
      "Return shipping is free for defective products",
      "Customer bears return shipping cost for non-defective returns",
      "Refunds are processed within 5-7 business days after inspection",
      "Exchanges are subject to product availability",
    ],
  },
  {
    title: "Delivery Issues",
    content: "If you experience any issues with your delivery, such as a delayed, lost, or damaged package, please contact our support team immediately.",
    details: [
      "Delayed delivery: Contact us if your order hasn't arrived within the estimated timeframe",
      "Lost package: We will investigate and reship or refund within 5 business days",
      "Damaged package: Report within 48 hours with photos for immediate resolution",
      "Wrong item received: Contact us immediately for free return and correct item shipment",
      "Incomplete order: Missing items will be shipped separately at no extra cost",
    ],
  },
  {
    title: "Delivery Hours",
    content: "Deliveries are made during standard business hours. Our logistics partners deliver between 9:00 AM and 9:00 PM, Saturday through Thursday.",
    details: [
      "Delivery hours: 9:00 AM to 9:00 PM",
      "Delivery days: Saturday to Thursday",
      "No deliveries on Fridays and public holidays",
      "Specific time-slot delivery is not available",
      "Delivery person will call before arriving",
    ],
  },
  {
    title: "Bulk & Corporate Orders",
    content: "Special shipping arrangements and discounted rates are available for bulk and corporate orders. Contact our sales team for custom shipping quotes.",
    details: [
      "Minimum 10 units for bulk order pricing",
      "Free shipping on bulk orders above PKR 100,000",
      "Custom packaging available for corporate orders",
      "Dedicated account manager for corporate clients",
      "Payment terms available for approved corporate accounts",
    ],
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

export default function ShippingPolicy() {
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

      gsap.utils.toArray(".shipping-section").forEach((sec) => {
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

      gsap.utils.toArray(".shipping-section").forEach((sec, i) => {
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
            <span className="text-white text-3xl sm:text-4xl font-bold">S</span>
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>

          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Shipping Policy
          </h1>

          <p className="hero-sub text-sm sm:text-base text-gray-400 mt-4 sm:mt-5 max-w-lg mx-auto leading-relaxed">
            Everything you need to know about how NovaDrive ships your orders — from processing to delivery.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-medium text-gray-500">1-2 Day Processing</span>
            </div>
            <div className="hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-medium text-gray-500">Free Shipping Over 10K</span>
            </div>
            <div className="hero-meta flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-medium text-gray-500">Fully Insured</span>
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
                <div key={i} id={`section-${i}`} className="shipping-section scroll-mt-24 mb-8 sm:mb-10">
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-500">
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">Section {String(i + 1).padStart(2, "0")}</span>
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight mt-0.5">{section.title}</h2>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed mb-4 sm:mb-5">{section.content}</p>

                    {/* Shipping Table */}
                    {section.table && (
                      <div className="mb-4 sm:mb-5 overflow-hidden rounded-xl border border-gray-100">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                              <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Method</th>
                              <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Time</th>
                              <th className="text-right px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.map((row, j) => (
                              <tr key={j} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <td className="px-4 py-3 text-xs font-semibold text-gray-900">{row.method}</td>
                                <td className="px-4 py-3 text-xs text-gray-500">{row.time}</td>
                                <td className="px-4 py-3 text-xs font-semibold text-gray-900 text-right">{row.cost}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {hasDetails && (
                      <div className="space-y-2">
                        {section.details.map((detail, j) => (
                          <div key={j} className="detail-item flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors duration-300 group">
                            <span className="text-[13px] text-[#FF5A1F] mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform duration-300">›</span>
                            <span className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Contact CTA */}
            <div className="footer-cta bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100 p-6 sm:p-8 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-2">Need Help With Shipping?</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto mb-5 leading-relaxed">
                Our support team is available to help with any shipping questions, tracking issues, or delivery concerns.
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
