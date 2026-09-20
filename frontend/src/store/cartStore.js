import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addToCart: (product, quantity = 1, variant = null) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.id === product.id && item.variant === variant
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += quantity;
        return { cart: updatedCart, isCartOpen: true };
      }

      return {
        cart: [...state.cart, { product, quantity, variant }],
        isCartOpen: true,
      };
    }),
  removeFromCart: (productId, variant = null) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.product.id === productId && item.variant === variant)
      ),
    })),
  updateQuantity: (productId, variant = null, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId && item.variant === variant
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  cartTotal: () => {
    // This is a getter function, better accessed via a selector in components
    return 0; // We'll compute this in the component
  },
}));
