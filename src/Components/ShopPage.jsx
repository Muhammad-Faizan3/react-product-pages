import { useRef, useLayoutEffect, useState, useMemo, useEffect } from "react";
import {
  ShoppingBag,
  Star,
  Heart,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  Check,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "../context/CartContext";
import { useTheme } from '../App';

import img1 from "../assets/WhatsApp Image 2026-07-11 at 5.07.56 PM (1).jpeg";
import img2 from "../assets/WhatsApp Image 2026-07-11 at 5.07.56 PM.jpeg";
import img3 from "../assets/WhatsApp Image 2026-07-11 at 5.13.54 PM.jpeg";
import img4 from "../assets/product.png";
import img5 from "../assets/product1.jpeg";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "NovaDrive 32GB",
    category: "Flash Drive",
    brand: "NovaDrive",
    capacity: "32GB",
    connector: "USB-A + Lightning",
    usbVersion: "USB 3.0",
    price: 10000,
    oldPrice: 12500,
    rating: 4.8,
    reviews: 128,
    image: img1,
    badge: "New",
    inStock: true,
    color: "Silver",
    description: "High-speed USB flash drive with Lightning connector",
  },
  {
    id: 2,
    name: "NovaDrive 64GB",
    category: "Flash Drive",
    brand: "NovaDrive",
    capacity: "64GB",
    connector: "USB-A + Lightning",
    usbVersion: "USB 3.0",
    price: 15000,
    oldPrice: 18000,
    rating: 4.9,
    reviews: 256,
    image: img2,
    badge: "Best Seller",
    inStock: true,
    color: "Silver",
    description: "Premium storage with lightning-fast transfer speeds",
  },
  {
    id: 3,
    name: "NovaDrive 128GB",
    category: "Flash Drive",
    brand: "NovaDrive",
    capacity: "128GB",
    connector: "USB-A + Lightning",
    usbVersion: "USB 3.0",
    price: 20000,
    oldPrice: 25000,
    rating: 4.7,
    reviews: 89,
    image: img3,
    badge: "Popular",
    inStock: true,
    color: "Black",
    description: "Massive storage in a compact design",
  },
  {
    id: 4,
    name: "NovaDrive Pro 256GB",
    category: "Premium Storage",
    brand: "NovaDrive Pro",
    capacity: "256GB",
    connector: "USB-C + USB-A",
    usbVersion: "USB 3.2",
    price: 35000,
    oldPrice: 42000,
    rating: 5.0,
    reviews: 64,
    image: img4,
    badge: "Premium",
    inStock: true,
    color: "Space Gray",
    description: "Ultra-fast premium storage with dual connectors",
  },
  {
    id: 5,
    name: "NovaDrive Lite 16GB",
    category: "Flash Drive",
    brand: "NovaDrive",
    capacity: "16GB",
    connector: "USB-A",
    usbVersion: "USB 2.0",
    price: 6000,
    oldPrice: 8000,
    rating: 4.6,
    reviews: 312,
    image: img5,
    badge: "Budget",
    inStock: false,
    color: "White",
    description: "Affordable everyday storage solution",
  },
];

const formatPrice = (price) => `PKR ${price.toLocaleString()}`;

const FILTER_SECTIONS = [
  {
    key: "category",
    label: "Category",
    options: ["Flash Drive", "Premium Storage"],
  },
  {
    key: "brand",
    label: "Brand",
    options: ["NovaDrive", "NovaDrive Pro"],
  },
  {
    key: "capacity",
    label: "Capacity",
    options: ["16GB", "32GB", "64GB", "128GB", "256GB"],
  },
  {
    key: "connector",
    label: "Connector Type",
    options: ["USB-A", "USB-A + Lightning", "USB-C + USB-A"],
  },
  {
    key: "usbVersion",
    label: "USB Version",
    options: ["USB 2.0", "USB 3.0", "USB 3.2"],
  },
  {
    key: "color",
    label: "Color",
    options: ["Silver", "Black", "Space Gray", "White"],
  },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "bestSelling", label: "Best Selling" },
  { value: "newest", label: "Newest" },
  { value: "priceLow", label: "Price Low → High" },
  { value: "priceHigh", label: "Price High → Low" },
];

/* ── Filter Section (Collapsible) ── */
function FilterGroup({ section, selected, onToggle }) {
  const [open, setOpen] = useState(true);
  const contentRef = useRef(null);
  const { dark } = useTheme();

  const toggleOpen = () => {
    setOpen(!open);
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: open ? 0 : "auto",
        opacity: open ? 0 : 1,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, { height: "auto", opacity: 1 });
    }
  }, []);

  return (
    <div className={`border-b ${dark ? 'border-white/8' : 'border-gray-100'} last:border-b-0`}>
      <button
        onClick={toggleOpen}
        className={`w-full flex items-center justify-between py-3.5 text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'} hover:text-black transition-colors cursor-pointer`}
      >
        {section.label}
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: "auto", opacity: 1 }}
      >
        <div className="pb-3 space-y-1">
          {section.options.map((opt) => {
            const checked = selected.includes(opt);
            return (
              <label
                key={opt}
                className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg transition-colors cursor-pointer group ${dark ? 'hover:bg-[#141414]' : 'hover:bg-gray-50'}`}
              >
                <span
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    checked
                      ? "bg-black border-black"
                      : "border-gray-300 group-hover:border-gray-500"
                  }`}
                >
                  {checked && <Check size={10} className="text-white" />}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(section.key, opt)}
                  className="sr-only"
                />
                <span className={`text-sm ${dark ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                  {opt}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Price Range Slider ── */
function PriceRange({ range, setRange }) {
  const { dark } = useTheme();
  return (
    <div className={`border-b ${dark ? 'border-white/8' : 'border-gray-100'} pb-4`}>
      <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'} mb-3`}>Price Range</p>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={60000}
            step={1000}
            value={range[0]}
            onChange={(e) => setRange([+e.target.value, range[1]])}
            className="w-full accent-black h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-1">{formatPrice(range[0])}</p>
        </div>
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={60000}
            step={1000}
            value={range[1]}
            onChange={(e) => setRange([range[0], +e.target.value])}
            className="w-full accent-black h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-1">{formatPrice(range[1])}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Rating Filter ── */
function RatingFilter({ minRating, setMinRating }) {
  const { dark } = useTheme();
  return (
    <div className={`border-b ${dark ? 'border-white/8' : 'border-gray-100'} pb-4`}>
      <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'} mb-3`}>Rating</p>
      <div className="space-y-1.5">
        {[4, 3, 2, 1].map((r) => (
          <button
            key={r}
            onClick={() => setMinRating(minRating === r ? 0 : r)}
            className={`flex items-center gap-2 py-1.5 px-2 rounded-lg w-full text-left transition-all cursor-pointer ${
              minRating === r
                ? "bg-black/5"
                : dark ? "hover:bg-[#141414]" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < r ? `${dark ? 'fill-white text-white' : 'fill-black text-black'}` : "text-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">& up</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Availability Filter ── */
function AvailabilityFilter({ inStockOnly, setInStockOnly }) {
  const { dark } = useTheme();
  return (
    <div className={`border-b ${dark ? 'border-white/8' : 'border-gray-100'} pb-4`}>
      <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'} mb-3`}>Availability</p>
      <label className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg transition-colors cursor-pointer group ${dark ? 'hover:bg-[#141414]' : 'hover:bg-gray-50'}`}>
        <span
          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            inStockOnly
              ? "bg-black border-black"
              : "border-gray-300 group-hover:border-gray-500"
          }`}
        >
          {inStockOnly && <Check size={10} className="text-white" />}
        </span>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={() => setInStockOnly(!inStockOnly)}
          className="sr-only"
        />
        <span className={`text-sm ${dark ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
          In Stock Only
        </span>
      </label>
    </div>
  );
}

/* ── Product Card ── */
function ProductCard({ product, index }) {
  const cardRef = useRef(null);
  const { addItem } = useCart();
  const { dark } = useTheme();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product, 1);
    const btn = e.currentTarget;
    gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `position:absolute;left:50%;top:50%;width:${size}px;height:${size}px;margin-left:-${size / 2}px;margin-top:-${size / 2}px;border-radius:50%;background:rgba(255,255,255,0.3);pointer-events:none;transform:scale(0);`;
    btn.appendChild(ripple);
    gsap.to(ripple, { scale: 2.5, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    gsap.fromTo(e.currentTarget, { scale: 0.5 }, {
      scale: 1.3, duration: 0.3, ease: "back.out(4)",
      onComplete: () => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 }),
    });
  };

  return (
    <div
      ref={cardRef}
      className={`group relative ${dark ? 'bg-[#0A0A0A]' : 'bg-white'} rounded-2xl border ${dark ? 'border-white/8' : 'border-gray-100'} overflow-hidden`}
    >
      <div className="absolute top-3 left-3 z-10">
        <span className="shop-badge-dark bg-black text-white text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider px-2 sm:px-3 py-1 rounded-full">
          {product.badge}
        </span>
      </div>
      <div className={`${dark ? 'bg-[#0A0A0A]' : 'bg-white'} rounded-t-2xl flex items-center justify-center p-3 sm:p-4 md:p-6 h-32 sm:h-40 md:h-52 lg:h-64 overflow-hidden`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain" 
        />
      </div>
      <div className={`mx-3 sm:mx-6 h-px ${dark ? 'bg-white/8' : 'bg-gray-100'}`} />
      <div className="p-3 sm:p-4 md:p-6">
        <span className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-gray-400">
          {product.category}
        </span>
        <h3 className={`mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'} leading-tight line-clamp-1`}>
          {product.name}
        </h3>
        <p className="hidden md:block mt-1.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="mt-1.5 sm:mt-3 flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                className="sm:text-xs md:text-sm" 
                style={{ 
                  fill: i < Math.floor(product.rating) ? (dark ? "white" : "black") : "none",
                  color: i < Math.floor(product.rating) ? (dark ? "white" : "black") : "#d1d5db"
                }} 
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{product.rating}</span>
          <span className="text-[9px] sm:text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="mt-2 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2.5 flex-wrap">
          <span className={`text-base sm:text-lg md:text-xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{formatPrice(product.price)}</span>
          <span className="text-[10px] sm:text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
          <span className="text-[8px] sm:text-[10px] font-semibold text-[#FF5A1F] bg-[#FF5A1F]/10 px-1.5 sm:px-2 py-0.5 rounded-full">
            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
          </span>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-4 md:mt-5">
          <button
            onClick={handleAddToCart}
            className="shop-btn-dark flex-1 h-9 sm:h-10 md:h-12 rounded-xl bg-black text-white text-[10px] sm:text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 relative overflow-hidden transition-all duration-300 hover:bg-[#FF5A1F] hover:shadow-[0_8px_30px_rgba(255,90,31,0.25)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <ShoppingBag size={14} className="sm:text-base" />
            <span className="hidden xs:inline">Add to Cart</span>
            <span className="xs:hidden">Add</span>
          </button>
          <button
            onClick={handleWishlist}
            className={`h-9 sm:h-10 md:h-12 w-9 sm:w-10 md:w-12 rounded-xl border ${dark ? 'border-white/12' : 'border-gray-200'} ${dark ? 'bg-[#0A0A0A]' : 'bg-white'} text-gray-500 flex items-center justify-center transition-all duration-300 hover:border-[#FF5A1F] hover:text-[#FF5A1F] hover:shadow-[0_8px_30px_rgba(255,90,31,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer`}
          >
            <Heart size={14} className="sm:text-base" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Shop Page ── */
export default function ShopPage() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const filterPanelRef = useRef(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilter, setMobileFilter] = useState(false);
  const [filterOpen, setFilterOpen] = useState(true);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortOpen, setSortOpen] = useState(false);

  const { dark } = useTheme();

  const toggleFilter = (key, value) => {
    setSelectedFilters((prev) => {
      const current = prev[key] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const clearAll = () => {
    setSelectedFilters({});
    setSearch("");
    setMinRating(0);
    setInStockOnly(false);
    setPriceRange([0, 60000]);
    setSortBy("featured");
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    Object.values(selectedFilters).forEach((arr) => { count += arr.length; });
    if (minRating) count++;
    if (inStockOnly) count++;
    if (priceRange[0] > 0 || priceRange[1] < 60000) count++;
    return count;
  }, [selectedFilters, minRating, inStockOnly, priceRange]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          p.badge.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.capacity.toLowerCase().includes(q)
      );
    }

    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter((p) => values.includes(p[key]));
      }
    });

    if (minRating) {
      result = result.filter((p) => p.rating >= minRating);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "bestSelling":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [search, selectedFilters, minRating, inStockOnly, priceRange, sortBy]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const FilterContent = () => (
    <div className="space-y-0">
      <FilterGroup section={FILTER_SECTIONS[0]} selected={selectedFilters.category || []} onToggle={toggleFilter} />
      <FilterGroup section={FILTER_SECTIONS[1]} selected={selectedFilters.brand || []} onToggle={toggleFilter} />
      <FilterGroup section={FILTER_SECTIONS[2]} selected={selectedFilters.capacity || []} onToggle={toggleFilter} />
      <FilterGroup section={FILTER_SECTIONS[3]} selected={selectedFilters.connector || []} onToggle={toggleFilter} />
      <FilterGroup section={FILTER_SECTIONS[4]} selected={selectedFilters.usbVersion || []} onToggle={toggleFilter} />
      <PriceRange range={priceRange} setRange={setPriceRange} />
      <RatingFilter minRating={minRating} setMinRating={setMinRating} />
      <AvailabilityFilter inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} />
      <FilterGroup section={FILTER_SECTIONS[5]} selected={selectedFilters.color || []} onToggle={toggleFilter} />
    </div>
  );

  return (
    <section ref={sectionRef} className={`w-full ${dark ? 'bg-[#0A0A0A]' : 'bg-white'} min-h-screen overflow-hidden`}>
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[120px] py-10 sm:py-12 md:py-16 lg:py-24">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-8 sm:mb-10 lg:mb-14">
          <span className={`inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 ${dark ? 'bg-[#1E1E1E]' : 'bg-gray-100'} px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-5`}>
            Our Collection
          </span>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${dark ? 'text-white' : 'text-gray-900'} tracking-tight`}>
            Shop All Products
          </h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed px-4">
            Discover our premium range of NovaDrive storage solutions.
          </p>
          <div className="mt-4 sm:mt-6 w-12 sm:w-16 h-[2px] bg-black mx-auto rounded-full" />

          {/* Search Bar */}
          <div className="mt-6 sm:mt-8 max-w-lg mx-auto relative px-4 sm:px-0">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className={`w-full h-10 sm:h-11 md:h-12 pl-4 sm:pl-5 pr-10 sm:pr-12 rounded-xl border-2 ${dark ? 'border-white/12' : 'border-gray-200'} ${dark ? 'bg-[#141414]' : 'bg-gray-50'} text-sm ${dark ? 'text-white' : 'text-gray-900'} placeholder-gray-400 outline-none transition-all duration-300 focus:border-black ${dark ? 'focus:bg-[#1A1A1A]' : 'focus:bg-white'} focus:shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}
            />
            <button className="shop-search-dark absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-black flex items-center justify-center hover:bg-[#FF5A1F] transition-all duration-300 cursor-pointer">
              <Search size={14} className="sm:text-base text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Filter Button - FIXED ChevronDown className */}
        <div className="lg:hidden flex items-center justify-between mb-4 sm:mb-6 px-1">
          <button
            onClick={() => setMobileFilter(true)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border-2 ${dark ? 'border-white/12' : 'border-gray-200'} text-xs sm:text-sm font-semibold ${dark ? 'text-gray-300' : 'text-gray-700'} hover:border-black transition-all cursor-pointer`}
          >
            <SlidersHorizontal size={14} className="sm:text-base" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="shop-badge-dark w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black text-white text-[8px] sm:text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Mobile Sort - FIXED ChevronDown className */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border-2 ${dark ? 'border-white/12' : 'border-gray-200'} text-xs sm:text-sm font-semibold ${dark ? 'text-gray-300' : 'text-gray-700'} hover:border-black transition-all cursor-pointer`}
            >
              <span>Sort</span>
              <ChevronDown 
                size={12} 
                className={`sm:text-sm transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`} 
              />
            </button>
            {sortOpen && (
              <div className={`absolute right-0 top-full mt-2 w-48 sm:w-52 ${dark ? 'bg-[#0A0A0A]' : 'bg-white'} border ${dark ? 'border-white/12' : 'border-gray-200'} rounded-xl shadow-xl z-50 py-2`}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    className={`shop-sort-mobile w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors cursor-pointer ${
                      sortBy === opt.value
                        ? "bg-black text-white font-semibold"
                        : dark ? "text-gray-400 hover:bg-[#141414]" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Toggle Button (desktop) */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setFilterOpen(!filterOpen);
              if (filterPanelRef.current) {
                gsap.to(filterPanelRef.current, {
                  width: filterOpen ? 0 : 260,
                  opacity: filterOpen ? 0 : 1,
                  x: filterOpen ? -20 : 0,
                  duration: 0.4,
                  ease: "power3.inOut",
                });
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 ${dark ? 'border-white/12' : 'border-gray-200'} text-sm font-semibold ${dark ? 'text-gray-300' : 'text-gray-700'} hover:border-black ${dark ? 'hover:bg-[#141414]' : 'hover:bg-gray-50'} transition-all cursor-pointer`}
          >
            <SlidersHorizontal size={16} className={`transition-transform duration-300 ${filterOpen ? "rotate-180" : ""}`} />
            {filterOpen ? "Hide Filters" : "Show Filters"}
            {activeFilterCount > 0 && (
              <span className="shop-badge-dark w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <p className="text-sm text-gray-400">
            Showing <span className={`font-semibold ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex gap-6 lg:gap-10">
          {/* Desktop Sidebar */}
          <div
            ref={filterPanelRef}
            className="hidden lg:block shrink-0 overflow-hidden"
            style={{ width: filterOpen ? 260 : 0 }}
          >
            <div className="w-[260px] sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-bold ${dark ? 'text-white' : 'text-gray-900'} uppercase tracking-wider`}>
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-gray-400 hover:text-[#FF5A1F] transition-colors cursor-pointer"
                  >
                    Clear all ({activeFilterCount})
                  </button>
                )}
              </div>

              <FilterContent />

              {/* Sort (desktop) */}
              <div className={`mt-6 pt-4 border-t ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                <p className={`text-sm font-bold ${dark ? 'text-white' : 'text-gray-900'} uppercase tracking-wider mb-3`}>
                  Sort By
                </p>
                <div className="space-y-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`shop-sort-dark w-full flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                        sortBy === opt.value
                          ? "bg-black text-white font-semibold"
                          : dark ? "text-gray-400 hover:bg-[#141414] hover:text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span
                        className={`sort-dot w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          sortBy === opt.value ? "border-white" : "border-gray-300"
                        }`}
                      >
                        {sortBy === opt.value && (
                          <span className="sort-dot-inner w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {Object.entries(selectedFilters).map(([key, values]) =>
                  values.map((v) => (
                    <span
                      key={`${key}-${v}`}
                      className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${dark ? 'bg-[#1E1E1E]' : 'bg-gray-100'} text-[10px] sm:text-xs font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {v}
                      <button
                        onClick={() => toggleFilter(key, v)}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gray-300 flex items-center justify-center hover:bg-[#FF5A1F] hover:text-white transition-colors cursor-pointer"
                      >
                        <X size={7} className="sm:w-2 sm:h-2" />
                      </button>
                    </span>
                  ))
                )}
                {minRating > 0 && (
                  <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${dark ? 'bg-[#1E1E1E]' : 'bg-gray-100'} text-[10px] sm:text-xs font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {minRating}★ & up
                    <button onClick={() => setMinRating(0)} className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gray-300 flex items-center justify-center hover:bg-[#FF5A1F] hover:text-white transition-colors cursor-pointer">
                      <X size={7} className="sm:w-2 sm:h-2" />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${dark ? 'bg-[#1E1E1E]' : 'bg-gray-100'} text-[10px] sm:text-xs font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                    In Stock
                    <button onClick={() => setInStockOnly(false)} className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gray-300 flex items-center justify-center hover:bg-[#FF5A1F] hover:text-white transition-colors cursor-pointer">
                      <X size={7} className="sm:w-2 sm:h-2" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAll}
                  className="text-[10px] sm:text-xs text-gray-400 hover:text-[#FF5A1F] transition-colors cursor-pointer ml-0.5 sm:ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-20">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${dark ? 'bg-[#1E1E1E]' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5`}>
                  <Search size={20} className="sm:w-6 sm:h-6 text-gray-300" />
                </div>
                <h3 className={`text-base sm:text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
                  No products found
                </h3>
                <p className="mt-1 sm:mt-2 text-sm text-gray-500 px-4">
                  Try adjusting your filters or search term
                </p>
                <button
                  onClick={clearAll}
                  className="shop-clear-btn mt-4 sm:mt-5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold hover:bg-[#FF5A1F] transition-all duration-300 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-24 text-center">
          <button className={`px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl border-2 border-black ${dark ? 'text-white' : 'text-black'} text-xs sm:text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 cursor-pointer`}>
            View All Categories
          </button>
        </div>
      </div>

      <style>{`
        .dark .shop-btn-dark {
          background-color: #fff !important;
          color: #000 !important;
        }
        .dark .shop-btn-dark:hover {
          background-color: #FF5A1F !important;
          color: #fff !important;
        }
        .dark .shop-badge-dark {
          background-color: #fff !important;
          color: #000 !important;
        }
        .dark .shop-search-dark {
          background-color: #fff !important;
        }
        .dark .shop-search-dark svg {
          color: #000 !important;
        }
        .dark .shop-sort-dark {
          background-color: #fff !important;
          color: #000 !important;
        }
        .dark .shop-sort-dark .sort-dot {
          border-color: #000 !important;
        }
        .dark .shop-sort-dark .sort-dot-inner {
          background-color: #000 !important;
        }
        .dark .shop-sort-mobile {
          background-color: #fff !important;
          color: #000 !important;
        }
        .dark .shop-clear-btn {
          background-color: #fff !important;
          color: #000 !important;
        }
        .dark .shop-clear-btn:hover {
          background-color: #FF5A1F !important;
          color: #fff !important;
        }
      `}</style>

      {/* Mobile Filter Drawer */}
      {mobileFilter && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFilter(false)}
          />
          <div className={`absolute left-0 top-0 bottom-0 w-[300px] sm:w-[320px] max-w-[85vw] ${dark ? 'bg-[#0A0A0A]' : 'bg-white'} shadow-2xl overflow-y-auto`}>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className={`text-base sm:text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
                <button
                  onClick={() => setMobileFilter(false)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${dark ? 'bg-[#1E1E1E] hover:bg-[#2A2A2A]' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center transition-colors cursor-pointer`}
                >
                  <X size={14} className="sm:text-base" />
                </button>
              </div>
              <FilterContent />
              <div className={`mt-6 pt-4 border-t ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                <p className={`text-sm font-bold ${dark ? 'text-white' : 'text-gray-900'} uppercase tracking-wider mb-3`}>
                  Sort By
                </p>
                <div className="space-y-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`shop-sort-dark w-full flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                        sortBy === opt.value
                          ? "bg-black text-white font-semibold"
                          : dark ? "text-gray-400 hover:bg-[#141414] hover:text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span
                        className={`sort-dot w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          sortBy === opt.value ? "border-white" : "border-gray-300"
                        }`}
                      >
                        {sortBy === opt.value && (
                          <span className="sort-dot-inner w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className={`flex-1 py-2.5 sm:py-3 rounded-xl border-2 ${dark ? 'border-white/12' : 'border-gray-200'} text-xs sm:text-sm font-semibold ${dark ? 'text-gray-400' : 'text-gray-600'} hover:border-black transition-all cursor-pointer`}
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setMobileFilter(false)}
                  className="shop-btn-dark flex-1 py-2.5 sm:py-3 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold hover:bg-[#FF5A1F] transition-all cursor-pointer"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}