import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAutoAnim } from './hooks/useInView'
import { CartProvider, useCart } from './context/CartContext'
import { ShoppingBag, ChevronDown, Sun, Moon } from 'lucide-react'
import { useState, useRef, useEffect, createContext, useContext } from 'react'
import Product from './Components/Product'
import StickySlideSection from './Components/StickySlideSection'
import './App.css'
import ProductGallery from './Components/ProductGallery'
import ProductSection from './Components/Productsection'
import WhenToUse from './Components/Whentouse'
import ContactSection from './Components/Contactsection'
import MarqueeSection from './Components/MarqueeSection'
import Banner from './Components/Banner'
import FeatureHighlight from './Components/FeatureHighlight'
import SelectedWork from './Components/SelectedWork'
import CustomCursor from './Components/CustomCursor'
import ShopPage from './Components/ShopPage'
import CartPage from './Components/CartPage'
import CheckoutPage from './Components/CheckoutPage'
import ThankYouPage from './Components/ThankYouPage'
import PrivacyPolicy from './Components/PrivacyPolicy'
import TermsPage from './Components/TermsPage'
import ShippingPolicy from './Components/ShippingPolicy'
import FAQPage from './Components/FAQPage'

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

function Navbar() {
  const location = useLocation()
  const { totalItems } = useCart()
  const { dark, toggleDark } = useTheme()
  const [legalOpen, setLegalOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setLegalOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const isLegalActive = ["/privacy", "/terms", "/shipping", "/faq"].includes(location.pathname)

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      dark ? 'bg-[#0A0A0A]/80 border-white/10' : 'bg-white/80 border-gray-100'
    }`}>
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-20 xl:px-[120px] h-14 flex items-center justify-between">
        <Link to="/" className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
          dark ? 'text-white' : 'text-gray-900'
        }`}>
          NovaDrive
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors duration-300 ${
              location.pathname === '/'
                ? (dark ? 'text-white' : 'text-black')
                : (dark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black')
            }`}
          >
            Product
          </Link>
          <Link
            to="/shop"
            className={`text-sm font-medium transition-colors duration-300 ${
              location.pathname === '/shop'
                ? (dark ? 'text-white' : 'text-black')
                : (dark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black')
            }`}
          >
            Shop
          </Link>
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setLegalOpen(!legalOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                isLegalActive
                  ? (dark ? 'text-white' : 'text-black')
                  : (dark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black')
              }`}
            >
              Legal
              <ChevronDown size={14} className={`transition-transform duration-300 ${legalOpen ? 'rotate-180' : ''}`} />
            </button>
            {legalOpen && (
              <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 z-50 transition-colors duration-300 ${
                dark ? 'bg-[#141414] border-white/10' : 'bg-white border-gray-100'
              }`}>
                {[
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms & Conditions" },
                  { to: "/shipping", label: "Shipping Policy" },
                  { to: "/faq", label: "FAQs" },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setLegalOpen(false)}
                    className={`block px-4 py-2 text-xs font-medium transition-colors duration-200 ${
                      location.pathname === item.to
                        ? (dark ? 'text-white bg-white/5' : 'text-black bg-gray-50')
                        : (dark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-black hover:bg-gray-50')
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={toggleDark}
            className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
              dark
                ? 'text-white hover:bg-white/10'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/cart"
            className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
              location.pathname === '/cart'
                ? (dark ? 'text-white' : 'text-black')
                : (dark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black')
            }`}
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className={`absolute -top-2 -right-3 w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center transition-colors duration-300 ${
                dark ? 'bg-white text-black' : 'bg-black text-white'
              }`}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

function ProductPage() {
  return (
    <>
      <MarqueeSection />
      <Banner />
      <Product />
      <FeatureHighlight />
      <StickySlideSection />
      <ProductGallery />
      <ProductSection />
      <WhenToUse />
      <ContactSection />
    </>
  )
}

function AppInner() {
  useAutoAnim()
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('novadrive_theme')
    if (saved) return saved === 'dark'
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('novadrive_theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleDark = () => setDark((d) => !d)

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
    <CartProvider>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </CartProvider>
    </ThemeContext.Provider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}

export default App
