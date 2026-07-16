# NovaDrive — Full E-Commerce Flow + Legal Pages

React + Vite + Tailwind CSS responsive product page with GSAP-powered animations, custom cursor, shop page with filters, complete Cart → Checkout → Thank You flow, and legal/info pages (Privacy, Terms, Shipping, FAQ).

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | ^19.2.7 | UI framework |
| Vite | ^8.1.1 | Build tool & dev server |
| Tailwind CSS | ^4.3.2 | Utility-first styling |
| @tailwindcss/vite | ^4.3.2 | Tailwind Vite plugin |
| GSAP | ^3.15.0 | ScrollTrigger, timeline animations, parallax, magnetic cursor |
| Lucide React | ^1.24.0 | Icons (Check, Minus, Plus, Star, Heart, etc.) |
| react-router-dom | ^7.x | Client-side routing (`/` product, `/shop` shop, `/cart` cart, `/checkout` checkout, `/thank-you` confirmation, `/privacy`, `/terms`, `/shipping`, `/faq`) |
| @vitejs/plugin-react | ^6.0.3 | React Fast Refresh for Vite |
| oxlint | ^1.71.0 | Linter |

## Project Structure

```
src/
├── App.jsx                    # Router setup, Navbar (cart icon + badge), routes
├── App.css                    # @import "tailwindcss"
├── index.css                  # Global styles, animation system, theme vars, scrollbar
├── context/
│   └── CartContext.jsx        # Cart state management (localStorage persisted)
├── Components/
│   ├── ShopPage.jsx           # Shop page — filter sidebar, search, sort, product cards, mobile drawer
│   ├── Product.jsx            # Hero product section — GSAP timeline, mouse parallax, ripple, floating image, variant selector, cart
│   ├── ProductGallery.jsx     # Image gallery — GSAP crossfade, mouse parallax, thumbnail counter
│   ├── Productsection.jsx     # Specs, key features, box contents — GSAP ScrollTrigger staggered reveals, 3D card tilt, animated counters
│   ├── Whentouse.jsx          # When-to-use rows — GSAP staggered slide-in from alternate sides
│   ├── Contactsection.jsx     # Contact form — GSAP staggered field reveals, underline-grow focus animation
│   ├── CartPage.jsx           # Shopping cart — items list, quantity stepper, order summary, promo code, checkout link
│   ├── CheckoutPage.jsx       # 3-step checkout — shipping form, payment (Card/JazzCash/COD), confirm & place order
│   ├── ThankYouPage.jsx       # Order confirmation — confetti, checkmark animation, timeline, feedback, quick actions, receipt download
│   ├── PrivacyPolicy.jsx      # Privacy policy — 12 sections, sticky TOC, GSAP scroll animations
│   ├── TermsPage.jsx          # Terms & conditions — 12 sections, sticky TOC, GSAP scroll animations
│   ├── ShippingPolicy.jsx     # Shipping policy — 12 sections with shipping table, sticky TOC, GSAP scroll animations
│   ├── FAQPage.jsx            # FAQ accordion — 10 items, GSAP expand/collapse, scroll stagger
│   └── CustomCursor.jsx       # Custom magnetic cursor — dot + ring + glow, auto-hides on touch devices
├── hooks/
│   └── useInView.jsx          # Custom hooks: useInView, ScrollReveal, useAutoAnim, useCountUp, WaveText
└── assets/
    └── *.jpeg, *.png          # Product images
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Product, ProductGallery, ProductSection, WhenToUse, ContactSection | Full product detail page |
| `/shop` | ShopPage | Shop page with filters, search, sort, product cards |
| `/cart` | CartPage | Shopping cart with items, quantity controls, order summary, promo code |
| `/checkout` | CheckoutPage | 3-step checkout: Shipping → Payment → Confirm & Place Order |
| `/thank-you` | ThankYouPage | Order confirmation with confetti, timeline, feedback, receipt download, quick actions |
| `/privacy` | PrivacyPolicy | Privacy policy with 12 sections, sticky TOC, GSAP scroll animations |
| `/terms` | TermsPage | Terms & conditions with 12 sections, sticky TOC, GSAP scroll animations |
| `/shipping` | ShippingPolicy | Shipping policy with 12 sections, shipping rates table, sticky TOC |
| `/faq` | FAQPage | FAQ accordion with 10 items, GSAP expand/collapse, scroll stagger |

## Dependencies Breakdown

### Runtime Dependencies

- **react** / **react-dom** — Core UI library
- **tailwindcss** + **@tailwindcss/vite** — Utility classes (gray-*, border, flex, grid, responsive breakpoints)
- **react-router-dom** — Client-side routing between product page (`/`), shop (`/shop`), cart (`/cart`), checkout (`/checkout`), thank you (`/thank-you`), privacy (`/privacy`), terms (`/terms`), shipping (`/shipping`), FAQ (`/faq`)
- **gsap** — Used for:
  - `ScrollTrigger` — scroll-driven reveals on Productsection, Whentouse, Contactsection, ShopPage cards
  - `gsap.timeline` — Product.jsx entrance sequence (staggered elements)
  - `gsap.fromTo` / `gsap.to` — mouse parallax, image crossfade, magnetic hover, floating animation, ripple effect, filter sidebar slide
  - `gsap.context` — cleanup on unmount
- **lucide-react** — Icon components (ShieldCheck, RotateCcw, Truck, Lock, Star, Heart, Share2, ShoppingBag, Check, Minus, Plus, PhoneCall, Search, SlidersHorizontal, ChevronDown, X, Eye, Trash2, CreditCard, Banknote, MapPin, Package, Clock, MessageCircle, Download, Share, Mail, ChevronRight, ShoppingBag, Smartphone)

### Dev Dependencies

- **vite** — Dev server + production build
- **@vitejs/plugin-react** — JSX transform, Fast Refresh
- **@types/react** / **@types/react-dom** — TypeScript type definitions
- **oxlint** — Fast Rust-based linter

## Shop Page (`/shop`)

### Features

- **Search Bar** — Live search by name, category, description, badge, brand, capacity. Search icon button with orange hover. Results count updates in real-time.
- **Filter Sidebar (Desktop)** — Toggle button ("Show Filters" / "Hide Filters") with GSAP slide animation (width 0 → 260px). Sticky positioning. Collapsible filter groups.
- **Filter Drawer (Mobile)** — Slide-in drawer from left with backdrop blur. "Show N Results" button.
- **Active Filter Tags** — Tags above grid with X to remove. "Clear all" counter.
- **Sort By** — Featured, Best Selling, Newest, Price Low→High, Price High→Low. Radio button style with black active state.

### Filter Categories

| Filter | Options |
|--------|---------|
| Category | Flash Drive, Premium Storage |
| Brand | NovaDrive, NovaDrive Pro |
| Capacity | 16GB, 32GB, 64GB, 128GB, 256GB |
| Connector Type | USB-A, USB-A + Lightning, USB-C + USB-A |
| USB Version | USB 2.0, USB 3.0, USB 3.2 |
| Color | Silver, Black, Space Gray, White |
| Price Range | Dual range slider (0 — 60,000 PKR) |
| Rating | 4★, 3★, 2★, 1★ & up |
| Availability | In Stock Only |

### Product Cards

- White image container (`h-40 mobile`, `h-52 tablet`, `h-64 desktop`) with `object-contain`, `hover:scale-105`
- Badge (New, Best Seller, Popular, Premium, Budget)
- Wishlist + Quick View buttons (appear on hover with stagger)
- Category, name, description, star rating, price with strikethrough old price + discount badge
- "Add to Cart" button — black bg, orange (`#FF5A1F`) on hover with glow shadow + ripple effect
- 3D card tilt on mouse move (GSAP `rotateY`/`rotateX` with `transformPerspective: 800`)
- Elastic bounce back on mouse leave
- GSAP ScrollTrigger stagger from bottom with blur-to-sharp

### Responsive Grid

- **Mobile**: 2 columns, `gap-4`
- **Tablet**: 3 columns, `gap-6`
- **Desktop**: 3 columns with sidebar, `gap-8`

## Cart Page (`/cart`)

### Features

- **Cart Items List** — Product image, name, category, capacity, unit price, quantity stepper (minus/plus), line total, remove button with GSAP slide-out animation
- **Quantity Stepper** — Minus/Plus buttons with GSAP bounce effect on value change, direct input support
- **Order Summary Sidebar** — Subtotal, discount (20% off original), total savings, shipping (free over 10,000 PKR), grand total
- **Promo Code** — Input field with "Apply" button, `NOVA20` code for 20% discount, success/error feedback
- **Empty Cart State** — Shopping bag icon, "Your cart is empty" message, "Start Shopping" link to `/shop`
- **Checkout Button** — Links to `/checkout`, disabled when cart is empty
- **GSAP Animations** — Slide-in from left on mount, bounce on quantity change, slide-out on remove, fade-in summary

## Checkout Page (`/checkout`)

### 3-Step Flow

| Step | Name | Description |
|------|------|-------------|
| 1 | Shipping | Full name, email, phone, address, city, postal code with validation |
| 2 | Payment | Card (JazzCash, debit/credit), Cash on Delivery with animated selection |
| 3 | Confirm | Order review, shipping/payment summary, terms checkbox, place order |

### Features

- **Step Indicator** — Animated progress bar with numbered steps, orange fill on completion, GSAP width animation
- **Shipping Form** — 6 fields with labels, validation (required, email format, 10-digit phone), GSAP stagger reveal, underline-grow focus
- **Payment Selection** — 3 options with card icons, animated border highlight, CardForm sub-section (card number, expiry, CVV, cardholder name)
- **Confirm Step** — Order items list, shipping summary, payment method badge, terms & conditions checkbox
- **Place Order** — 1.5s loading spinner → navigate to `/thank-you`, `orderPlacedRef` prevents race condition with `clearCart()`
- **Empty Cart Redirect** — Redirects to `/cart` if cart is empty (uses `useRef` flag to avoid React state race)

## Thank You Page (`/thank-you`)

### Features

- **Order Confirmation** — Large checkmark with pulse ring animation, confetti particles (30 floating shapes), order ID with copy-to-clipboard
- **Order Timeline** — 4-step progress: Confirmed → Processing → Shipped → Delivered, GSAP stagger reveal
- **Quick Actions** — Continue Shopping (`/shop`), Download Receipt (thermal receipt in new window with print), Share Order (Web Share API / clipboard)
- **Feedback Section** — 5-star rating with hover labels, tags (Fast Delivery, Great Quality, etc.), optional comment textarea, submit confirmation
- **Support Card** — "Need help?" with email/phone icons, GSAP slide-in on scroll
- **GSAP Animations** — Icon spin+scale entrance, card stagger from bottom, timeline reveal, feedback slide-in, top scroll on mount

## Privacy Policy (`/privacy`)

### Features

- **Hero Section** — Dark circle with "P" letter, spin+bounce+float animation, "Legal" badge, SSL Encrypted/GDPR Compliant/Transparent Practices meta badges
- **12 Policy Sections** — Information We Collect, How We Use Your Information, Payment Security, Shipping Information, Cookies, Data Protection, Third-Party Services, Your Rights, Product Information, Children's Privacy, Changes to This Policy, Contact Us
- **Sticky Table of Contents** — Desktop left sidebar, highlights active section on scroll via ScrollTrigger
- **Dark CTA Box** — "By using NovaDrive...you agree to this Privacy Policy"
- **Contact CTA** — Email button + Back to Home link
- **GSAP Animations** — Hero entrance timeline, section blur-to-sharp ScrollTrigger, detail items stagger from left, footer CTA scale-in, floating element

## Terms & Conditions (`/terms`)

### Features

- **Hero Section** — Dark circle with "T" letter, spin+bounce+float, "Legal" badge, Fair Terms/Secure Transactions/Transparent Policies badges
- **12 Terms Sections** — Acceptance of Terms, Products & Descriptions, Pricing & Payment, Shipping & Delivery, Returns & Refunds, Warranty, Prohibited Uses, User Accounts, Limitation of Liability, Intellectual Property, Changes to Terms, Contact Information
- **Sticky Table of Contents** — Desktop left sidebar with active section tracking
- **Dark CTA Box** — "By using NovaDrive...you agree to these Terms and Conditions"
- **Contact CTA** — Email button + Back to Home
- **GSAP Animations** — Same system as Privacy Policy: hero timeline, section reveals, stagger, CTA entrance

## Shipping Policy (`/shipping`)

### Features

- **Hero Section** — Dark circle with "S" letter, spin+bounce+float, "Legal" badge, 1-2 Day Processing/Free Shipping Over 10K/Fully Insured badges
- **12 Shipping Sections** — Order Processing, Domestic Shipping (with rates table), International Shipping, Shipping Areas & Coverage, Order Tracking, Payment Methods, Cash on Delivery (COD), Shipping Insurance, Returns & Exchanges, Delivery Issues, Delivery Hours, Bulk & Corporate Orders
- **Shipping Rates Table** — Standard (3-5 days, PKR 500), Express (1-2 days, PKR 1,000), Free (orders above 10K, 3-5 days)
- **Sticky Table of Contents** — Desktop left sidebar
- **Contact CTA** — Contact Support button + Back to Home
- **GSAP Animations** — Hero timeline, section blur-to-sharp, detail items stagger, table row hover

## FAQ Page (`/faq`)

### Features

- **Hero Section** — Dark circle with "?" character, spin+bounce+float, "Support" badge, Quick Answers/10 FAQs/24hr Support badges
- **10 Accordion FAQs** — Device compatibility, Storage capacities, USB 3.0, Free shipping, Delivery time, Returns, Warranty, Order tracking, Payment security, Customer support
- **GSAP Accordion** — Smooth height+opacity expand/collapse, chevron rotate animation
- **Numbered Items** — Each FAQ shows a zero-padded number (01, 02, etc.)
- **Stagger on Scroll** — Each FAQ item fades in with blur-to-sharp on scroll
- **Still Have Questions CTA** — Contact Support button + Back to Home
- **GSAP Animations** — Hero timeline, FAQ stagger reveal, accordion expand/collapse, CTA entrance

## Cart Context (`/context/CartContext.jsx`)

### State Management

- **localStorage Persistence** — Cart data saved to `novadrive_cart` key, survives page refresh and tab close
- **Functions**: `addItem`, `removeItem`, `updateQuantity`, `setQuantity`, `clearCart`
- **Computed Values**: `totalItems`, `totalPrice`, `totalOldPrice`, `justAdded` (2s toast)
- **Variant Support** — Different sizes/variants tracked by composite key (`id-capacity`)
- **Duplicate Handling** — Adding existing item increments quantity instead of creating duplicate

## Animation System

All animations live in `index.css` (CSS classes) + component-level GSAP (JS).

### CSS Classes (index.css)
| Class | Effect |
|-------|--------|
| `btn-magnetic` | Button hover: translate + scale + glow shadow |
| `gradient-border` | Animated gradient background loop |
| `glass-card` | Glassmorphism with hover lift + border |
| `text-glow` | Text shadow glow on hover |
| `orange-shimmer` | Gradient text shimmer animation |
| `tilt-card` | 3D perspective tilt on hover |
| `underline-grow` | Underline grows from center on hover |
| `glow-ring` | Pulse glow ring on focus |
| `scale-pop` | Pop-in scale entrance |
| `ripple` | Click ripple expansion |
| `img-zoom` | Image zoom on hover |
| `skeleton` | Loading skeleton shimmer |
| `section-enter` | Blur-to-sharp section entrance |

### GSAP Animations (JS)
- **ShopPage.jsx**: Filter sidebar GSAP slide (width/opacity/x), filter group collapse animation, card ScrollTrigger stagger, 3D card tilt, ripple on Add to Cart, wishlist bounce
- **Product.jsx**: Entrance timeline, mouse parallax (3D tilt on image), floating image, scroll zoom, magnetic variant buttons, ripple on click, wishlist bounce, share spin
- **ProductGallery.jsx**: Smooth crossfade with blur transition, mouse parallax on main image
- **Productsection.jsx**: ScrollTrigger staggered stat reveals, 3D card tilt on hover, feature list stagger, spec row slide-in, animated counter (256 count-up)
- **Whentouse.jsx**: Heading slide-in, rows stagger from alternate sides with blur
- **Contactsection.jsx**: Form fields stagger reveal on scroll, underline-grow focus
- **CartPage.jsx**: Items slide-in from left, quantity bounce, item slide-out on remove, summary fade-in
- **CheckoutPage.jsx**: Step indicator width animation, form field stagger, payment card highlight, loading spinner
- **ThankYouPage.jsx**: Checkmark spin+scale, confetti particles, timeline stagger, card slide-in from bottom, top scroll on mount, receipt download (new window)
- **PrivacyPolicy.jsx**: Hero entrance timeline, section blur-to-sharp ScrollTrigger, detail items stagger, floating element, TOC active tracking
- **TermsPage.jsx**: Hero timeline, section reveals, detail stagger, CTA entrance, TOC active tracking
- **ShippingPolicy.jsx**: Hero timeline, section blur-to-sharp, table row hover, detail stagger, CTA entrance
- **FAQPage.jsx**: Hero timeline, FAQ stagger on scroll, accordion height+opacity+chevron GSAP animation
- **CustomCursor.jsx**: Dot + ring + glow following mouse, scale up on interactive elements, auto-hide on touch devices

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Run oxlint
npm run preview   # Preview production build
```

## Theme

- Background: White (`#FFFFFF`) / Gray-50 (`#F9FAFB`)
- Text: Black (`#111111`) / Gray-600 (`#4B5563`)
- Accent: Black (`#000000`), Button hover: Orange (`#FF5A1F`)
- Font: `"SF Pro Display", Arial, sans-serif`
