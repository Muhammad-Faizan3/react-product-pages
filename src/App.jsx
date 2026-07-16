import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAutoAnim } from './hooks/useInView'
import { CartProvider, useCart } from './context/CartContext'
import { ShoppingBag, ChevronDown } from 'lucide-react'
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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-20 xl:px-[120px] h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-gray-900 tracking-tight">
          NovaDrive
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors duration-300 ${
              location.pathname === '/'
                ? 'text-black'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            Product
          </Link>
          <Link
            to="/shop"
            className={`text-sm font-medium transition-colors duration-300 ${
              location.pathname === '/shop'
                ? 'text-black'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            Shop
          </Link>
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setLegalOpen(!legalOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                isLegalActive
                  ? 'text-black'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              Legal
              <ChevronDown size={14} className={`transition-transform duration-300 ${legalOpen ? 'rotate-180' : ''}`} />
            </button>
            {legalOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 z-50">
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
                        ? 'text-black bg-gray-50'
                        : 'text-gray-400 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/cart"
            className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
              location.pathname === '/cart'
                ? 'text-black'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
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
