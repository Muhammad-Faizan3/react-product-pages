import { useRef, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Lock,
  ChevronRight,
  PackageOpen,
  X,
  CreditCard,
  Check,
} from "lucide-react";
import gsap from "gsap";
import { useCart } from "../context/CartContext";

const formatPrice = (price) => `PKR ${price.toLocaleString()}`;

const perks = [
  { icon: Truck, label: "Free Shipping", sub: "On orders over PKR 10,000" },
  { icon: ShieldCheck, label: "Secure Payment", sub: "256-bit SSL encryption" },
  { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
  { icon: Lock, label: "Buyer Protection", sub: "Full refund guarantee" },
];

function CartItem({ item, index }) {
  const rowRef = useRef(null);
  const { removeItem, updateQuantity } = useCart();

  useLayoutEffect(() => {
    if (!rowRef.current) return;
    gsap.fromTo(
      rowRef.current,
      { opacity: 0, x: -60, filter: "blur(8px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.7,
        delay: index * 0.1,
        ease: "power3.out",
      }
    );
  }, [index]);

  const handleRemove = () => {
    gsap.to(rowRef.current, {
      x: 120,
      opacity: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => removeItem(item.key),
    });
  };

  const handleQty = (delta) => {
    const btn = document.getElementById(`qty-${item.key}-${delta > 0 ? "inc" : "dec"}`);
    if (btn) {
      gsap.fromTo(btn, { scale: 0.7 }, { scale: 1, duration: 0.3, ease: "back.out(4)" });
    }
    updateQuantity(item.key, delta);
  };

  const itemTotal = item.price * item.quantity;
  const itemOldTotal = (item.oldPrice || item.price) * item.quantity;

  return (
    <div
      ref={rowRef}
      className="group relative bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
    >
      <div className="flex gap-4 sm:gap-6 items-start">
        {/* Product Image */}
        <div className="relative shrink-0 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden border border-gray-100">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <PackageOpen size={28} className="text-gray-300" />
          )}
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 pointer-events-none" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                {item.category}
              </span>
              <h3 className="mt-0.5 text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
                {item.name}
              </h3>
              {item.capacity && (
                <span className="inline-block mt-1 text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
                  {item.capacity}
                </span>
              )}
            </div>
            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100"
              aria-label="Remove item"
            >
              <Trash2 size={15} />
            </button>
          </div>

          {/* Price + Quantity Row */}
          <div className="mt-3 sm:mt-4 flex items-center justify-between gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50/50 hover:border-gray-200 transition-colors">
              <button
                id={`qty-${item.key}-dec`}
                onClick={() => handleQty(-1)}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
              >
                <Minus size={13} />
              </button>
              <span className="w-7 sm:w-8 text-center text-xs sm:text-sm font-bold text-gray-900 tabular-nums">
                {item.quantity}
              </span>
              <button
                id={`qty-${item.key}-inc`}
                onClick={() => handleQty(1)}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
              >
                <Plus size={13} />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 tabular-nums">
                {formatPrice(itemTotal)}
              </p>
              {itemOldTotal > itemTotal && (
                <p className="text-[10px] sm:text-xs text-gray-400 line-through tabular-nums">
                  {formatPrice(itemOldTotal)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile remove button */}
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all lg:hidden cursor-pointer"
      >
        <X size={13} />
      </button>
    </div>
  );
}

function PromoCode() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  const btnRef = useRef(null);

  const applyCode = () => {
    if (code.trim().toUpperCase() === "NOVA20") {
      setApplied(true);
      setError(false);
      gsap.fromTo(btnRef.current, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
    } else {
      setError(true);
      gsap.fromTo(
        inputRef.current,
        { x: -8 },
        { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" }
      );
    }
  };

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Promo Code</p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            ref={inputRef}
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder="Enter code"
            disabled={applied}
            className={`w-full h-10 pl-9 pr-3 rounded-xl text-sm outline-none transition-all duration-300 ${
              applied
                ? "bg-green-50 border-2 border-green-200 text-green-600"
                : error
                ? "bg-red-50 border-2 border-red-200 text-red-500"
                : "bg-gray-50 border-2 border-gray-100 text-gray-900 focus:border-black focus:bg-white"
            }`}
          />
        </div>
        <button
          ref={btnRef}
          onClick={applyCode}
          disabled={applied || !code.trim()}
          className={`h-10 px-4 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
            applied
              ? "bg-green-500 text-white"
              : "bg-gray-900 text-white hover:bg-black"
          }`}
        >
          {applied ? <Check size={14} /> : "Apply"}
        </button>
      </div>
      {error && (
        <p className="mt-1.5 text-[11px] text-red-400">Invalid promo code</p>
      )}
      {applied && (
        <p className="mt-1.5 text-[11px] text-green-500 font-medium">
          Code NOVA20 applied! You get 20% off
        </p>
      )}
    </div>
  );
}

function OrderSummary() {
  const { totalPrice, totalOldPrice, totalItems } = useCart();
  const summaryRef = useRef(null);
  const [checkoutHover, setCheckoutHover] = useState(false);

  useLayoutEffect(() => {
    if (!summaryRef.current) return;
    gsap.fromTo(
      summaryRef.current,
      { opacity: 0, y: 40, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  const discount = totalOldPrice - totalPrice;
  const shipping = totalPrice >= 10000 ? 0 : 500;
  const finalTotal = totalPrice + shipping;

  return (
    <div
      ref={summaryRef}
      className="relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 lg:p-7 overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full pointer-events-none" />

      <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
        Order Summary
      </h2>
      <p className="text-xs text-gray-400 mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""} in cart</p>

      <div className="mt-5 space-y-3">
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
          <span className={`font-medium tabular-nums ${shipping === 0 ? "text-green-500" : "text-gray-900"}`}>
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>

        {/* Divider */}
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-[10px] text-gray-300">TOTAL</span>
          </div>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="text-sm font-semibold text-gray-900">Total</span>
          <span className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">{formatPrice(finalTotal)}</span>
        </div>
      </div>

      <PromoCode />

      {/* Checkout Button */}
      <Link
        to="/checkout"
        onMouseEnter={() => setCheckoutHover(true)}
        onMouseLeave={() => setCheckoutHover(false)}
        className="mt-6 w-full h-12 sm:h-13 rounded-xl bg-gradient-to-r from-gray-900 to-black text-white text-sm font-semibold flex items-center justify-center gap-2 relative overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Lock size={14} />
          Proceed to Checkout
          <ArrowRight size={14} className={`transition-transform duration-300 ${checkoutHover ? "translate-x-1" : ""}`} />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A1F] to-[#FF5A1F] opacity-0 hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-white opacity-0 hover:opacity-100 transition-opacity duration-500 z-10">
          <CreditCard size={14} />
          Pay Now
          <ArrowRight size={14} />
        </span>
      </Link>

      {/* Trust badges */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Lock size={10} /> SSL
        </div>
        <div className="w-px h-3 bg-gray-200" />
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <ShieldCheck size={10} /> Secure
        </div>
        <div className="w-px h-3 bg-gray-200" />
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Truck size={10} /> Fast Delivery
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current.querySelector(".empty-icon"),
      { opacity: 0, scale: 0.5, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(2)" }
    )
    .fromTo(
      containerRef.current.querySelector(".empty-title"),
      { opacity: 0, y: 20, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
      "-=0.4"
    )
    .fromTo(
      containerRef.current.querySelector(".empty-desc"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    )
    .fromTo(
      containerRef.current.querySelector(".empty-btn"),
      { opacity: 0, y: 15, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
      "-=0.2"
    );
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32">
      <div className="empty-icon relative mb-6 sm:mb-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border border-gray-100">
          <ShoppingBag size={40} className="text-gray-300 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 bg-gray-100 rounded-full blur-sm" />
      </div>

      <h2 className="empty-title text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
        Your cart is empty
      </h2>
      <p className="empty-desc mt-2 sm:mt-3 text-sm sm:text-base text-gray-400 max-w-sm text-center leading-relaxed px-4">
        Looks like you haven't added any NovaDrive products yet. Start exploring our collection!
      </p>

      <Link
        to="/shop"
        className="empty-btn mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300"
      >
        <ShoppingBag size={16} />
        Browse Products
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default function CartPage() {
  const { items, clearCart, totalItems } = useCart();
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 30, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }
    );

    if (items.length > 0 && itemsRef.current) {
      tl.fromTo(
        itemsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
    }

    // Perks animation
    const perks = pageRef.current.querySelectorAll(".perk-item");
    if (perks.length) {
      tl.fromTo(
        perks,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 },
        "-=0.3"
      );
    }

    return () => tl.kill();
  }, [items.length]);

  return (
    <section ref={pageRef} className="w-full bg-gradient-to-b from-white via-gray-50/50 to-white min-h-screen">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[120px] py-10 sm:py-12 md:py-16 lg:py-24">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 sm:mb-10 lg:mb-14">
          <span className="inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 bg-gray-100 px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-5">
            Your Selection
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed px-4">
            {totalItems > 0
              ? `You have ${totalItems} item${totalItems !== 1 ? "s" : ""} waiting for checkout`
              : "Start adding items to your cart"}
          </p>
          <div className="mt-4 sm:mt-6 w-12 sm:w-16 h-[2px] bg-black mx-auto rounded-full" />
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Cart Content */}
            <div ref={itemsRef} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 lg:gap-8 xl:gap-10 items-start">
              {/* Cart Items */}
              <div>
                {/* Top bar */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <p className="text-xs sm:text-sm text-gray-400">
                    <span className="font-semibold text-gray-700">{totalItems}</span> product{totalItems !== 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    Clear cart
                  </button>
                </div>

                {/* Items list */}
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item, i) => (
                    <CartItem key={item.key} item={item} index={i} />
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-6 sm:mt-8 flex items-center justify-between">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors duration-300 group"
                  >
                    <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:sticky lg:top-24">
                <OrderSummary />
              </div>
            </div>

            {/* Trust Perks */}
            <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {perks.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="perk-item text-center p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 group-hover:bg-gray-900 flex items-center justify-center mx-auto transition-all duration-500">
                    <Icon size={18} className="text-gray-400 group-hover:text-white transition-colors duration-500 sm:w-5 sm:h-5" />
                  </div>
                  <p className="mt-3 text-xs sm:text-sm font-semibold text-gray-900">{label}</p>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-gray-400 leading-relaxed">{sub}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
