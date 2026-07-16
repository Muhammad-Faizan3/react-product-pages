import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ArrowRight,
  PackageOpen,
  Star,
  Mail,
  Truck,
  Clock,
  MapPin,
  CreditCard,
  Download,
  Share2,
  Copy,
  Heart,
  Sparkles,
  MessageCircle,
  ThumbsUp,
  Gift,
} from "lucide-react";
import gsap from "gsap";

const TIMELINE = [
  { icon: Check, label: "Order Confirmed", sub: "Just now", active: true },
  { icon: PackageOpen, label: "Processing", sub: "Within 24 hours", active: false },
  { icon: Truck, label: "Shipped", sub: "2-3 business days", active: false },
  { icon: MapPin, label: "Delivered", sub: "5-7 business days", active: false },
];

const FEEDBACK_OPTIONS = [
  { icon: ThumbsUp, label: "Great Quality" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: Gift, label: "Great Value" },
  { icon: Heart, label: "Love It" },
  { icon: Sparkles, label: "Exceeded Expectations" },
];

function Confetti() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const pieces = containerRef.current.querySelectorAll(".confetti-piece");
    pieces.forEach((piece) => {
      const delay = Math.random() * 1.5;
      const xDrift = (Math.random() - 0.5) * 400;
      const yDrift = -(200 + Math.random() * 400);
      const rotation = Math.random() * 720 - 360;

      gsap.set(piece, {
        x: 0,
        y: -50,
        rotation: 0,
        opacity: 1,
      });

      gsap.to(piece, {
        x: xDrift,
        y: yDrift + 600,
        rotation: rotation,
        opacity: 0,
        duration: 2.5 + Math.random() * 1.5,
        delay: delay,
        ease: "power1.out",
        repeat: -1,
        repeatDelay: Math.random() * 2,
      });
    });
  }, []);

  const colors = ["#111", "#333", "#555", "#888", "#aaa", "#d1d5db", "#e5e7eb"];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            backgroundColor: colors[i % colors.length],
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

function PulseRings() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const rings = containerRef.current.querySelectorAll(".pulse-ring");
    rings.forEach((ring, i) => {
      gsap.fromTo(
        ring,
        { scale: 0.5, opacity: 0.7 },
        {
          scale: 2.5,
          opacity: 0,
          duration: 2,
          delay: i * 0.6,
          ease: "power2.out",
          repeat: -1,
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="pulse-ring absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-gray-900/10"
        />
      ))}
    </div>
  );
}

function OrderTimeline() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".timeline-item");
    gsap.fromTo(
      items,
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: "power3.out", delay: 0.8 }
    );
  }, []);

  return (
    <div ref={ref} className="relative">
      <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-4">Order Timeline</h3>
      <div className="space-y-0">
        {TIMELINE.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="timeline-item flex items-start gap-3 relative">
              {/* Vertical line */}
              {i < TIMELINE.length - 1 && (
                <div className="absolute left-[15px] top-[32px] w-0.5 h-8 bg-gray-100" />
              )}
              {/* Dot */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  step.active
                    ? "bg-gray-900 text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <Icon size={14} />
              </div>
              {/* Text */}
              <div className="pt-1 pb-4">
                <p className={`text-sm font-semibold ${step.active ? "text-gray-900" : "text-gray-400"}`}>
                  {step.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{step.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeedbackSection() {
  const ref = useRef(null);
  const [selected, setSelected] = useState([]);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 1.8 });
  }, []);

  const toggleFeedback = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    gsap.fromTo(ref.current.querySelector(".submitted-msg"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(3)" });
  };

  if (submitted) {
    return (
      <div ref={ref} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 text-center">
        <div className="submitted-msg">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
            <Check size={20} className="text-green-500" />
          </div>
          <p className="text-sm font-semibold text-gray-900">Thanks for your feedback!</p>
          <p className="text-xs text-gray-400 mt-1">Your opinion helps us improve.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
      <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
        <MessageCircle size={15} className="text-gray-400" />
        Rate Your Experience
      </h3>
      <p className="text-xs text-gray-400 mt-1 mb-4">Tell us what you loved about your order</p>

      {/* Star Rating */}
      <div className="flex items-center gap-1.5 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="cursor-pointer group"
          >
            <Star
              size={28}
              className={`transition-all duration-300 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400 scale-110"
                  : "text-gray-200 group-hover:text-yellow-300"
              }`}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-xs text-gray-400 font-medium">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent!"}
          </span>
        )}
      </div>

      {/* Feedback Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {FEEDBACK_OPTIONS.map(({ icon: Icon, label }) => {
          const active = selected.includes(label);
          return (
            <button
              key={label}
              onClick={() => toggleFeedback(label)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                active
                  ? "bg-gray-900 text-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
                  : "bg-gray-50 text-gray-500 border border-gray-100 hover:border-gray-300"
              }`}
            >
              <Icon size={12} />
              {label}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className={`w-full h-10 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
          rating > 0
            ? "bg-gray-900 text-white hover:bg-black hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Submit Feedback
      </button>
    </div>
  );
}

export default function ThankYouPage() {
  const pageRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    try {
      const data = localStorage.getItem("novadrive_last_order");
      if (data) {
        const parsed = JSON.parse(data);
        setOrder(parsed);
        // Generate stable order ID from date
        const d = new Date(parsed.date);
        setOrderId(`ND-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
      } else {
        setOrderId(`ND-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
      }
    } catch {
      setOrderId(`ND-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    }
  }, []);

  const downloadReceipt = () => {
    const items = order?.items || [];
    const subtotal = order?.subtotal || 0;
    const discount = order?.discount || 0;
    const shippingCost = order?.shippingCost || 0;
    const total = order?.total || 0;
    const shipping = order?.shipping || {};
    const payment = order?.payment || "N/A";
    const orderDate = order?.date ? new Date(order.date).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" }) : new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" });

    const receiptHTML = `<!DOCTYPE html>
<html><head><title>Receipt - ${orderId}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'SF Pro Display', Arial, sans-serif; background: #fff; padding: 30px; color: #111; }
  .receipt { max-width: 400px; margin: 0 auto; }
  .header { text-align: center; border-bottom: 2px dashed #e5e7eb; padding-bottom: 16px; margin-bottom: 16px; }
  .header h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
  .header p { font-size: 11px; color: #9ca3af; margin-top: 4px; }
  .order-id { font-size: 12px; font-weight: 700; background: #f3f4f6; padding: 6px 12px; border-radius: 6px; display: inline-block; margin-top: 8px; }
  .section { margin-bottom: 14px; }
  .section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #9ca3af; margin-bottom: 8px; }
  .item { display: flex; justify-content: space-between; align-items: flex-start; padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
  .item:last-child { border-bottom: none; }
  .item-name { font-size: 13px; font-weight: 600; flex: 1; }
  .item-cap { font-size: 10px; color: #9ca3af; }
  .item-qty { font-size: 11px; color: #6b7280; }
  .item-price { font-size: 13px; font-weight: 600; text-align: right; white-space: nowrap; }
  .row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; }
  .row.total { font-size: 15px; font-weight: 800; border-top: 2px solid #111; padding-top: 8px; margin-top: 6px; }
  .row .label { color: #6b7280; }
  .row.discount .value { color: #16a34a; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .info-item .label { font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; }
  .info-item .value { font-size: 12px; font-weight: 600; margin-top: 2px; }
  .footer { text-align: center; border-top: 2px dashed #e5e7eb; padding-top: 14px; margin-top: 14px; }
  .footer p { font-size: 11px; color: #9ca3af; }
  .footer .brand { font-size: 14px; font-weight: 800; color: #111; margin-bottom: 4px; }
  @media print { body { padding: 10px; } }
</style></head><body>
<div class="receipt">
  <div class="header">
    <h1>NovaDrive</h1>
    <p>Order Receipt</p>
    <div class="order-id">${orderId}</div>
    <p style="margin-top:6px">${orderDate}</p>
  </div>

  <div class="section">
    <div class="section-title">Items</div>
    ${items.map((i) => `<div class="item"><div><div class="item-name">${i.name}</div><div class="item-cap">${i.capacity || ""} ${i.category || ""}</div><div class="item-qty">Qty: ${i.quantity}</div></div><div class="item-price">PKR ${(i.price * i.quantity).toLocaleString()}</div></div>`).join("\n    ")}
    ${items.length === 0 ? '<p style="font-size:12px;color:#9ca3af;">No items</p>' : ""}
  </div>

  <div class="section">
    <div class="section-title">Summary</div>
    <div class="row"><span class="label">Subtotal</span><span>PKR ${subtotal.toLocaleString()}</span></div>
    ${discount > 0 ? `<div class="row discount"><span class="label">Discount (20%)</span><span class="value">- PKR ${discount.toLocaleString()}</span></div>` : ""}
    <div class="row"><span class="label">Shipping</span><span>${shippingCost === 0 ? "Free" : `PKR ${shippingCost.toLocaleString()}`}</span></div>
    <div class="row total"><span class="label">Total</span><span>PKR ${total.toLocaleString()}</span></div>
  </div>

  <div class="section">
    <div class="section-title">Shipping</div>
    <div class="info-grid">
      <div class="info-item"><div class="label">Name</div><div class="value">${shipping.fullName || "N/A"}</div></div>
      <div class="info-item"><div class="label">Phone</div><div class="value">${shipping.phone || "N/A"}</div></div>
      <div class="info-item" style="grid-column:1/-1"><div class="label">Address</div><div class="value">${shipping.address || ""}, ${shipping.city || ""}, ${shipping.province || ""} ${shipping.postalCode || ""}</div></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Payment</div>
    <div class="row"><span class="label">Method</span><span style="font-weight:600">${payment === "card" ? "Credit/Debit Card" : payment === "jazzcash" ? "JazzCash" : payment === "cod" ? "Cash on Delivery" : payment}</span></div>
  </div>

  <div class="footer">
    <div class="brand">NovaDrive</div>
    <p>Thank you for your purchase!</p>
    <p>support@novadrive.pk | +92 300 1234567</p>
  </div>
</div>
<script>window.onload = () => { window.print(); }</script>
</body></html>`;

    const w = window.open("", "_blank", "width=450,height=700");
    if (w) {
      w.document.write(receiptHTML);
      w.document.close();
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (!pageRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Icon with spin + bounce
    tl.fromTo(
      pageRef.current.querySelector(".hero-icon"),
      { scale: 0, rotate: -180, opacity: 0 },
      { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "back.out(3)" }
    )
      // Title
      .fromTo(
        pageRef.current.querySelector(".hero-title"),
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
        "-=0.4"
      )
      // Subtitle
      .fromTo(
        pageRef.current.querySelector(".hero-sub"),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      // Divider line
      .fromTo(
        pageRef.current.querySelector(".hero-divider"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6 },
        "-=0.2"
      )
      // Order ID badge
      .fromTo(
        pageRef.current.querySelector(".order-badge"),
        { opacity: 0, y: 15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
        "-=0.2"
      )
      // Info cards
      .fromTo(
        pageRef.current.querySelectorAll(".info-card"),
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.1 },
        "-=0.2"
      )
      // Action buttons
      .fromTo(
        pageRef.current.querySelectorAll(".action-btn"),
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" },
        "-=0.1"
      );

    // Floating sparkle on icon
    const icon = pageRef.current.querySelector(".hero-icon");
    if (icon) {
      gsap.to(icon, {
        y: -8,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });
    }
  }, []);

  const copyOrderId = () => {
    navigator.clipboard?.writeText(orderId);
    setCopied(true);
    gsap.fromTo(
      pageRef.current.querySelector(".copy-feedback"),
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={pageRef}
      className="w-full bg-gradient-to-b from-white via-gray-50/30 to-white min-h-screen relative overflow-hidden"
    >
      <Confetti />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[120px] py-10 sm:py-14 md:py-20 lg:py-28">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated Icon */}
          <div className="hero-icon relative inline-flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-gray-900 to-black mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            <PulseRings />
            <Check size={48} className="text-white relative z-10 sm:w-14 sm:h-14" strokeWidth={2.5} />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>

          {/* Title */}
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Thank You!
          </h1>

          {/* Subtitle */}
          <p className="hero-sub mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed px-4">
            Your order has been placed successfully. We&apos;ll send you a confirmation email with tracking details shortly.
          </p>

          {/* Divider */}
          <div className="hero-divider mt-6 sm:mt-8 w-16 h-[2px] bg-gray-900 mx-auto rounded-full origin-center" />

          {/* Order ID Badge */}
          <div className="order-badge mt-6 inline-flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-100">
              <PackageOpen size={15} className="text-gray-400" />
              <span className="text-xs text-gray-500">Order ID</span>
              <span className="text-sm font-bold text-gray-900 font-mono tracking-wider">{orderId}</span>
              <button
                onClick={copyOrderId}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-all cursor-pointer"
              >
                {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
              </button>
            </div>
            {copied && (
              <span className="copy-feedback text-[11px] text-green-500 font-medium">Copied to clipboard!</span>
            )}
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
          <div className="info-card bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 text-center hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group">
            <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-gray-900 flex items-center justify-center mx-auto transition-all duration-500">
              <Mail size={18} className="text-gray-400 group-hover:text-white transition-colors duration-500" />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-900">Email Sent</p>
            <p className="mt-1 text-[11px] text-gray-400 leading-relaxed">Confirmation email has been sent to your inbox</p>
          </div>

          <div className="info-card bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 text-center hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group">
            <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-gray-900 flex items-center justify-center mx-auto transition-all duration-500">
              <CreditCard size={18} className="text-gray-400 group-hover:text-white transition-colors duration-500" />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-900">Payment Confirmed</p>
            <p className="mt-1 text-[11px] text-gray-400 leading-relaxed">Your payment has been securely processed</p>
          </div>

          <div className="info-card bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 text-center hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group">
            <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-gray-900 flex items-center justify-center mx-auto transition-all duration-500">
              <Clock size={18} className="text-gray-400 group-hover:text-white transition-colors duration-500" />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-900">Estimated Delivery</p>
            <p className="mt-1 text-[11px] text-gray-400 leading-relaxed">5-7 business days from order date</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {/* Left - Timeline + Feedback */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
              <OrderTimeline />
            </div>
            <FeedbackSection />
          </div>

          {/* Right - Quick Actions */}
          <div className="space-y-4 lg:sticky lg:top-24">
            {/* What's Next */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
              <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-4">What&apos;s Next?</h3>
              <div className="space-y-3">
                <Link
                  to="/shop"
                  className="action-btn w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-900 group transition-all duration-500 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-gray-800 flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm">
                    <ShoppingBagIcon />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-semibold text-gray-900 group-hover:text-white transition-colors">Continue Shopping</p>
                    <p className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors">Browse more products</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </Link>

                <button
                  onClick={downloadReceipt}
                  className="action-btn w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-900 group transition-all duration-500 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-gray-800 flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm">
                    <Download size={15} className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-semibold text-gray-900 group-hover:text-white transition-colors">Download Receipt</p>
                    <p className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors">Save order details</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </button>

                <button
                  onClick={() => {
                    navigator.share?.({
                      title: "NovaDrive Order",
                      text: `I just ordered from NovaDrive! Order ID: ${orderId}`,
                      url: window.location.origin,
                    });
                  }}
                  className="action-btn w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-900 group transition-all duration-500 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-gray-800 flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm">
                    <Share2 size={15} className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-semibold text-gray-900 group-hover:text-white transition-colors">Share Order</p>
                    <p className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors">Tell friends about NovaDrive</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gray-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                  <Sparkles size={18} className="text-white" />
                </div>
                <p className="text-sm font-bold">Need Help?</p>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  Our support team is available 24/7 to assist you with your order.
                </p>
                <button className="mt-4 w-full h-9 rounded-lg bg-white text-gray-900 text-xs font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Brand */}
        <div className="mt-14 sm:mt-20 text-center">
          <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-[0.3em] font-medium">
            NovaDrive — Premium Storage Solutions
          </p>
        </div>
      </div>
    </section>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-white transition-colors">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
