import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

const CART_KEY = "novadrive_cart";

function loadCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [justAdded, setJustAdded] = useState(null);

  // localStorage mein save karo jab bhi items change hon
  const saveToStorage = useCallback((newItems) => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(newItems));
    } catch { /* ignore */ }
  }, []);

  const addItem = useCallback((product, quantity = 1, variant = null) => {
    setItems((prev) => {
      const key = variant
        ? `${product.id || product.name}-${variant.capacity || variant}`
        : `${product.id || product.name}`;

      const existing = prev.find((item) => item.key === key);
      const next = existing
        ? prev.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [
            ...prev,
            {
              key,
              id: product.id || product.name,
              name: product.name,
              price: variant ? variant.price : product.price,
              oldPrice: variant ? variant.price * 1.2 : product.oldPrice,
              image: product.image || product.images?.[variant?.capacity],
              category: product.category || product.collection || "Accessories",
              capacity: variant?.capacity || product.capacity || "",
              quantity,
            },
          ];
      saveToStorage(next);
      return next;
    });
    setJustAdded(product.name);
    setTimeout(() => setJustAdded(null), 2000);
  }, [saveToStorage]);

  const removeItem = useCallback((key) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.key !== key);
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  const updateQuantity = useCallback((key, delta) => {
    setItems((prev) => {
      const next = prev
        .map((item) =>
          item.key === key
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0);
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  const setQuantity = useCallback((key, qty) => {
    setItems((prev) => {
      const next = prev.map((item) =>
        item.key === key ? { ...item, quantity: Math.max(1, qty) } : item
      );
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  const clearCart = useCallback(() => {
    setItems([]);
    saveToStorage([]);
  }, [saveToStorage]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalOldPrice = items.reduce(
    (sum, item) => sum + (item.oldPrice || item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        setQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalOldPrice,
        justAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
