import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Smartphone,
  Wallet,
  Lock,
  ShieldCheck,
  Truck,
  Check,
  ArrowRight,
  PackageOpen,
  ArrowLeft,
} from "lucide-react";
import gsap from "gsap";
import { useCart } from "../context/CartContext";

const formatPrice = (price) => `PKR ${price.toLocaleString()}`;

const STEPS = [
  { label: "Shipping", icon: Truck },
  { label: "Payment", icon: CreditCard },
  { label: "Confirm", icon: Check },
];

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, UnionPay", icon: CreditCard },
  { id: "jazzcash", label: "JazzCash", sub: "Mobile wallet payment", icon: Smartphone },
  { id: "cod", label: "Cash on Delivery", sub: "Pay when you receive", icon: Wallet },
];

function StepIndicator({ currentStep }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.to(barRef.current, {
      width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
      duration: 0.6,
      ease: "power3.inOut",
    });
  }, [currentStep]);

  return (
    <div className="relative flex items-center justify-between max-w-md mx-auto mb-10 sm:mb-14">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100" />
      <div ref={barRef} className="absolute top-5 left-0 h-0.5 bg-gray-900" style={{ width: "0%" }} />
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isActive = i <= currentStep;
        const isCurrent = i === currentStep;
        return (
          <div key={step.label} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
              isCurrent ? "bg-gray-900 text-white scale-110 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
              : isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
            }`}>
              <Icon size={16} />
            </div>
            <span className={`text-[10px] sm:text-xs font-semibold tracking-wide transition-colors duration-500 ${
              isCurrent ? "text-gray-900" : isActive ? "text-gray-600" : "text-gray-300"
            }`}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ShippingForm({ data, onChange, errors }) {
  const formRef = useRef(null);

  useLayoutEffect(() => {
    if (!formRef.current) return;
    const fields = formRef.current.querySelectorAll(".form-field");
    gsap.fromTo(fields,
      { opacity: 0, y: 20, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.06, ease: "power3.out" }
    );
  }, []);

  const fields = [
    { name: "fullName", label: "Full Name", icon: User, placeholder: "John Doe", type: "text", col: true },
    { name: "email", label: "Email Address", icon: Mail, placeholder: "john@example.com", type: "email", col: true },
    { name: "phone", label: "Phone Number", icon: Phone, placeholder: "+92 300 1234567", type: "tel" },
    { name: "address", label: "Street Address", icon: MapPin, placeholder: "123 Main Street, Apt 4B", type: "text" },
    { name: "city", label: "City", icon: Building, placeholder: "Karachi", type: "text", col: true },
    { name: "province", label: "Province", icon: Building, placeholder: "Sindh", type: "text", col: true },
    { name: "postalCode", label: "Postal Code", icon: MapPin, placeholder: "75500", type: "text", half: true },
  ];

  return (
    <div ref={formRef} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => {
          const Icon = f.icon;
          const hasError = errors[f.name];
          return (
            <div key={f.name} className={`form-field ${f.col ? "" : "sm:col-span-2"} ${f.half ? "sm:col-span-1" : ""}`}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{f.label}</label>
              <div className="relative">
                <Icon size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${hasError ? "text-red-400" : "text-gray-300"}`} />
                <input
                  type={f.type}
                  value={data[f.name] || ""}
                  onChange={(e) => onChange(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  className={`w-full h-11 sm:h-12 pl-10 pr-4 rounded-xl text-sm outline-none transition-all duration-300 ${
                    hasError
                      ? "bg-red-50 border-2 border-red-200 text-red-600 placeholder-red-300 focus:border-red-400"
                      : "bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-300 focus:border-gray-900 focus:bg-white focus:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  }`}
                />
              </div>
              {hasError && <p className="mt-1 text-[11px] text-red-400 font-medium">{errors[f.name]}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PaymentStep({ method, onSelect }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".payment-card");
    if (!cards) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 25, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="space-y-3">
      {PAYMENT_METHODS.map((pm) => {
        const Icon = pm.icon;
        const selected = method === pm.id;
        return (
          <button key={pm.id} onClick={() => onSelect(pm.id)}
            className={`payment-card w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-500 cursor-pointer ${
              selected ? "border-gray-900 bg-gray-900/5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] scale-[1.01]"
              : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
              selected ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
            }`}>
              <Icon size={18} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-semibold transition-colors ${selected ? "text-gray-900" : "text-gray-700"}`}>{pm.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{pm.sub}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
              selected ? "border-gray-900 bg-gray-900" : "border-gray-200"
            }`}>
              {selected && <Check size={10} className="text-white" />}
            </div>
          </button>
        );
      })}
      {method === "card" && <CardForm />}
    </div>
  );
}

function CardForm() {
  const ref = useRef(null);
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "", name: "" });

  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0, y: 15, height: 0 }, { opacity: 1, y: 0, height: "auto", duration: 0.5, ease: "power3.out" });
  }, []);

  const formatCardNumber = (val) => {
    const v = val.replace(/\D/g, "").slice(0, 16);
    return v.replace(/(\d{4})(?=\d)/g, "$1 ");
  };
  const formatExpiry = (val) => {
    const v = val.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 2) return v.slice(0, 2) + "/" + v.slice(2);
    return v;
  };

  return (
    <div ref={ref} className="overflow-hidden">
      <div className="pt-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Card Number</label>
          <div className="relative">
            <CreditCard size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" value={cardData.number} onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
              placeholder="4242 4242 4242 4242"
              className="w-full h-11 pl-10 pr-4 rounded-xl text-sm bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-300 outline-none transition-all duration-300 focus:border-gray-900 focus:bg-white tabular-nums" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Expiry</label>
            <input type="text" value={cardData.expiry} onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
              placeholder="MM/YY"
              className="w-full h-11 px-4 rounded-xl text-sm bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-300 outline-none transition-all duration-300 focus:border-gray-900 focus:bg-white tabular-nums" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">CVV</label>
            <div className="relative">
              <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" value={cardData.cvv} onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                placeholder="123"
                className="w-full h-11 pl-10 pr-4 rounded-xl text-sm bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-300 outline-none transition-all duration-300 focus:border-gray-900 focus:bg-white tabular-nums" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Cardholder Name</label>
          <input type="text" value={cardData.name} onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
            placeholder="JOHN DOE"
            className="w-full h-11 px-4 rounded-xl text-sm bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-300 outline-none transition-all duration-300 focus:border-gray-900 focus:bg-white uppercase" />
        </div>
      </div>
    </div>
  );
}

function ConfirmStep({ shipping, payment, items, totalPrice, totalOldPrice, totalItems }) {
  const ref = useRef(null);
  const discount = totalOldPrice - totalPrice;
  const shippingCost = totalPrice >= 10000 ? 0 : 500;
  const finalTotal = totalPrice + shippingCost;

  useLayoutEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".confirm-block");
    gsap.fromTo(els, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" });
  }, []);

  return (
    <div ref={ref} className="space-y-5">
      <div className="confirm-block bg-gray-50 rounded-2xl p-4 sm:p-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <PackageOpen size={13} /> Order Items ({totalItems})
        </h3>
        <div className="space-y-2.5">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                {item.image ? <img src={item.image} alt={item.name} className="w-[80%] h-[80%] object-contain" />
                : <PackageOpen size={14} className="text-gray-300" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
                <p className="text-[10px] text-gray-400">Qty: {item.quantity}{item.capacity ? ` · ${item.capacity}` : ""}</p>
              </div>
              <p className="text-xs font-bold text-gray-900 tabular-nums">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="confirm-block bg-gray-50 rounded-2xl p-4 sm:p-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <MapPin size={13} /> Shipping Details
        </h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p className="font-semibold">{shipping.fullName}</p>
          <p className="text-gray-500">{shipping.address}</p>
          <p className="text-gray-500">{shipping.city}, {shipping.province} {shipping.postalCode}</p>
          <p className="text-gray-500">{shipping.phone}</p>
          <p className="text-gray-400 text-xs">{shipping.email}</p>
        </div>
      </div>

      <div className="confirm-block bg-gray-50 rounded-2xl p-4 sm:p-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <CreditCard size={13} /> Payment Method
        </h3>
        <p className="text-sm font-semibold text-gray-900">
          {PAYMENT_METHODS.find((m) => m.id === payment)?.label || "Not selected"}
        </p>
      </div>

      <div className="confirm-block bg-gray-50 rounded-2xl p-4 sm:p-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Price Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-gray-900 tabular-nums">{formatPrice(totalPrice)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Discount</span>
              <span className="font-medium text-green-500 tabular-nums">-{formatPrice(discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span className={`font-medium tabular-nums ${shippingCost === 0 ? "text-green-500" : ""}`}>
              {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900 tabular-nums">{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, totalOldPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({});
  const [payment, setPayment] = useState("");
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const orderPlacedRef = useRef(false);

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  const discount = totalOldPrice - totalPrice;
  const shippingCost = totalPrice >= 10000 ? 0 : 500;
  const finalTotal = totalPrice + shippingCost;

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(headerRef.current, { opacity: 0, y: 30, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 });
    if (contentRef.current) {
      tl.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }
    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (items.length === 0 && !orderPlacedRef.current) {
      navigate("/cart");
    }
  }, [items.length, navigate]);

  const handleShippingChange = (name, value) => {
    setShipping((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!shipping.fullName?.trim()) newErrors.fullName = "Name is required";
    if (!shipping.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(shipping.email)) newErrors.email = "Invalid email";
    if (!shipping.phone?.trim()) newErrors.phone = "Phone is required";
    if (!shipping.address?.trim()) newErrors.address = "Address is required";
    if (!shipping.city?.trim()) newErrors.city = "City is required";
    if (!shipping.province?.trim()) newErrors.province = "Province is required";
    if (!shipping.postalCode?.trim()) newErrors.postalCode = "Postal code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (step === 0 && !validateShipping()) return;
    if (step === 1 && !payment) return;
    const content = contentRef.current;
    if (content) {
      gsap.to(content, {
        opacity: 0, x: -30, filter: "blur(4px)", duration: 0.3, ease: "power2.in",
        onComplete: () => {
          setStep((s) => Math.min(s + 1, 2));
          gsap.fromTo(content, { opacity: 0, x: 30, filter: "blur(4px)" }, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.4, ease: "power3.out" });
        },
      });
    } else {
      setStep((s) => Math.min(s + 1, 2));
    }
  };

  const goBack = () => {
    const content = contentRef.current;
    if (content) {
      gsap.to(content, {
        opacity: 0, x: 30, filter: "blur(4px)", duration: 0.3, ease: "power2.in",
        onComplete: () => {
          setStep((s) => Math.max(s - 1, 0));
          gsap.fromTo(content, { opacity: 0, x: -30, filter: "blur(4px)" }, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.4, ease: "power3.out" });
        },
      });
    } else {
      setStep((s) => Math.max(s - 1, 0));
    }
  };

  const placeOrder = () => {
    setPlacing(true);
    const btn = document.getElementById("place-order-btn");
    if (btn) {
      gsap.to(btn, {
        scale: 0.95, backgroundColor: "#16a34a", duration: 0.4, ease: "power2.inOut",
        onComplete: () => { gsap.to(btn, { scale: 1, duration: 0.3, ease: "back.out(2)" }); },
      });
    }
    setTimeout(() => {
      orderPlacedRef.current = true;
      // Save order data to localStorage before clearing cart
      const orderData = {
        items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity, capacity: i.capacity, category: i.category })),
        subtotal: totalPrice,
        discount,
        shippingCost,
        total: finalTotal,
        shipping,
        payment,
        date: new Date().toISOString(),
      };
      try { localStorage.setItem("novadrive_last_order", JSON.stringify(orderData)); } catch { /* ignore */ }
      clearCart();
      navigate("/thank-you");
    }, 1500);
  };

  return (
    <section ref={pageRef} className="w-full bg-gradient-to-b from-white via-gray-50/50 to-white min-h-screen">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[120px] py-10 sm:py-12 md:py-16 lg:py-24">
        <div ref={headerRef} className="text-center mb-6 sm:mb-8">
          <span className="inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 bg-gray-100 px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-5">
            Secure Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Checkout</h1>
          <div className="mt-4 sm:mt-6 w-12 sm:w-16 h-[2px] bg-black mx-auto rounded-full" />
        </div>

        <StepIndicator currentStep={step} />

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-6 lg:gap-8 xl:gap-10 items-start">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 lg:p-8">
            {step === 0 && (
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <Truck size={18} className="text-gray-400" /> Shipping Information
                </h2>
                <p className="mt-1 text-xs text-gray-400">Where should we deliver your order?</p>
                <div className="mt-6"><ShippingForm data={shipping} onChange={handleShippingChange} errors={errors} /></div>
              </div>
            )}
            {step === 1 && (
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <CreditCard size={18} className="text-gray-400" /> Payment Method
                </h2>
                <p className="mt-1 text-xs text-gray-400">How would you like to pay?</p>
                <div className="mt-6"><PaymentStep method={payment} onSelect={setPayment} /></div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <Check size={18} className="text-gray-400" /> Review & Confirm
                </h2>
                <p className="mt-1 text-xs text-gray-400">Please review your order before placing</p>
                <div className="mt-6">
                  <ConfirmStep shipping={shipping} payment={payment} items={items} totalPrice={totalPrice} totalOldPrice={totalOldPrice} totalItems={totalItems} />
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors duration-300 cursor-pointer group">
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" /> Back
                </button>
              ) : (
                <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors duration-300 group">
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" /> Back to Cart
                </Link>
              )}
              {step < 2 ? (
                <button onClick={goNext} className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button id="place-order-btn" onClick={placeOrder} disabled={placing}
                  className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-500 cursor-pointer ${
                    placing ? "bg-green-500 scale-95" : "bg-gray-900 hover:bg-black hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                  }`}>
                  {placing ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order...</>
                  ) : (
                    <><Lock size={14} /> Place Order · {formatPrice(finalTotal)}</>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 lg:p-7 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full pointer-events-none" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">Your Order</h2>
              <p className="text-xs text-gray-400 mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
              <div className="mt-4 space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.image ? <img src={item.image} alt={item.name} className="w-[80%] h-[80%] object-contain" />
                      : <PackageOpen size={14} className="text-gray-300" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-[10px] text-gray-400">×{item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-gray-900 tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900 tabular-nums">{formatPrice(totalPrice)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-medium text-green-500 tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-medium tabular-nums ${shippingCost === 0 ? "text-green-500" : "text-gray-900"}`}>
                    {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">{formatPrice(finalTotal)}</span>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-[10px] text-gray-400"><Lock size={10} /> SSL</div>
                <div className="w-px h-3 bg-gray-200" />
                <div className="flex items-center gap-1 text-[10px] text-gray-400"><ShieldCheck size={10} /> Secure</div>
                <div className="w-px h-3 bg-gray-200" />
                <div className="flex items-center gap-1 text-[10px] text-gray-400"><Truck size={10} /> Fast</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
