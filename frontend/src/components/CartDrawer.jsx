import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { AnimatePresence, motion } from 'framer-motion';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-brand-espresso/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream z-[70] shadow-2xl flex flex-col border-l-4 border-brand-brown"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b-2 border-brand-brown/20 bg-white">
              <h2 className="font-serif text-xl text-brand-brown flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Cart ({cart.length})
              </h2>
              <button 
                onClick={toggleCart}
                className="text-brand-brown/60 hover:text-brand-terracotta p-1 rounded-full hover:bg-brand-brown/5 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-brown/50 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={() => { toggleCart(); navigate('/menu'); }}
                    className="text-brand-terracotta font-medium hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <div key={`${item.product.id}-${index}`} className="flex gap-4 bg-white p-3 rounded-xl border border-brand-brown/20 shadow-sm">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-white shrink-0 border border-brand-brown/10">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-brand-brown text-sm leading-snug pr-4">
                              {item.product.name}
                            </h3>
                            <button 
                              onClick={() => removeFromCart(item.product.id, item.variant)}
                              className="text-brand-brown/40 hover:text-brand-terracotta"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          {item.variant && (
                            <p className="text-xs text-brand-brown/60 mt-1">{item.variant}</p>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-end mt-2">
                          <p className="font-semibold text-brand-brown">
                            ₹{item.product.price * item.quantity}
                          </p>
                          
                          <div className="flex items-center bg-white border border-brand-brown/10 rounded-md overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)}
                              className="p-1 text-brand-brown/70 hover:bg-brand-brown/5"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-brand-brown">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                              className="p-1 text-brand-brown/70 hover:bg-brand-brown/5"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t-2 border-brand-brown/20 p-5 bg-white space-y-4">
                <div className="space-y-2 text-sm text-brand-brown/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center font-bold text-lg text-brand-brown pt-2 border-t border-brand-brown/10">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-brown text-white py-4 rounded-md font-medium hover:bg-brand-espresso transition-colors shadow-lg shadow-brand-brown/20"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
