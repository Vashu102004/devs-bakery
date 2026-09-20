import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ChevronRight, CreditCard, Banknote, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '',
    address: '', city: 'Indore', pincode: '',
    orderType: 'delivery', paymentMethod: 'upi'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = formData.orderType === 'delivery' && subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    clearCart();
    navigate('/tracking');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-cream">
        <h2 className="text-2xl font-serif text-brand-brown mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/menu')} className="text-brand-terracotta hover:underline">
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-serif font-bold text-brand-brown mb-8 text-center md:text-left">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form */}
          <div className="w-full lg:w-2/3 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Customer Info */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-brown/10">
                <h2 className="text-xl font-bold text-brand-brown mb-6 flex items-center gap-2">
                  <span className="bg-brand-terracotta text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-brown/80 mb-1">Full Name</label>
                    <input required type="text" name="name" onChange={handleInputChange} className="w-full px-4 py-2 border border-brand-brown/20 rounded-md focus:ring-brand-terracotta focus:border-brand-terracotta" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-brown/80 mb-1">Mobile Number</label>
                    <input required type="tel" name="mobile" onChange={handleInputChange} className="w-full px-4 py-2 border border-brand-brown/20 rounded-md focus:ring-brand-terracotta focus:border-brand-terracotta" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-brand-brown/80 mb-1">Email (Optional)</label>
                    <input type="email" name="email" onChange={handleInputChange} className="w-full px-4 py-2 border border-brand-brown/20 rounded-md focus:ring-brand-terracotta focus:border-brand-terracotta" />
                  </div>
                </div>
              </div>

              {/* Order Type & Address */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-brown/10">
                <h2 className="text-xl font-bold text-brand-brown mb-6 flex items-center gap-2">
                  <span className="bg-brand-terracotta text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Delivery Details
                </h2>
                
                <div className="flex gap-4 mb-6">
                  <label className={`flex-1 border p-4 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${formData.orderType === 'delivery' ? 'border-brand-terracotta bg-brand-terracotta/5' : 'border-brand-brown/20'}`}>
                    <input type="radio" name="orderType" value="delivery" checked={formData.orderType === 'delivery'} onChange={handleInputChange} className="text-brand-terracotta focus:ring-brand-terracotta" />
                    <span className="font-medium text-brand-brown">Home Delivery</span>
                  </label>
                  <label className={`flex-1 border p-4 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${formData.orderType === 'pickup' ? 'border-brand-terracotta bg-brand-terracotta/5' : 'border-brand-brown/20'}`}>
                    <input type="radio" name="orderType" value="pickup" checked={formData.orderType === 'pickup'} onChange={handleInputChange} className="text-brand-terracotta focus:ring-brand-terracotta" />
                    <span className="font-medium text-brand-brown">Store Pickup</span>
                  </label>
                </div>

                {formData.orderType === 'delivery' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-brown/80 mb-1">Complete Address</label>
                      <textarea required name="address" rows="3" onChange={handleInputChange} className="w-full px-4 py-2 border border-brand-brown/20 rounded-md focus:ring-brand-terracotta focus:border-brand-terracotta"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-brown/80 mb-1">City</label>
                        <input required type="text" name="city" value="Indore" readOnly className="w-full px-4 py-2 border border-brand-brown/20 rounded-md bg-gray-50 text-gray-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-brown/80 mb-1">Pincode</label>
                        <input required type="text" name="pincode" onChange={handleInputChange} className="w-full px-4 py-2 border border-brand-brown/20 rounded-md focus:ring-brand-terracotta focus:border-brand-terracotta" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-brown/10">
                <h2 className="text-xl font-bold text-brand-brown mb-6 flex items-center gap-2">
                  <span className="bg-brand-terracotta text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className={`border p-4 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${formData.paymentMethod === 'upi' ? 'border-brand-terracotta bg-brand-terracotta/5' : 'border-brand-brown/20'}`}>
                    <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} className="text-brand-terracotta focus:ring-brand-terracotta" />
                    <div className="font-medium text-brand-brown flex-1">UPI (GPay, PhonePe, Paytm)</div>
                  </label>
                  
                  <label className={`border p-4 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${formData.paymentMethod === 'card' ? 'border-brand-terracotta bg-brand-terracotta/5' : 'border-brand-brown/20'}`}>
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="text-brand-terracotta focus:ring-brand-terracotta" />
                    <div className="font-medium text-brand-brown flex-1 flex items-center gap-2">
                      <CreditCard size={18}/> Credit / Debit Card
                    </div>
                  </label>

                  <label className={`border p-4 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${formData.paymentMethod === 'cod' ? 'border-brand-terracotta bg-brand-terracotta/5' : 'border-brand-brown/20'}`}>
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="text-brand-terracotta focus:ring-brand-terracotta" />
                    <div className="font-medium text-brand-brown flex-1 flex items-center gap-2">
                      <Banknote size={18}/> {formData.orderType === 'pickup' ? 'Pay at Store' : 'Cash on Delivery'}
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-brand-brown/10 sticky top-24">
              <h2 className="text-xl font-bold text-brand-brown mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-brand-brown leading-tight">{item.product.name}</h4>
                      {item.variant && <p className="text-xs text-brand-brown/60">{item.variant}</p>}
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-brand-brown/80">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium text-brand-brown">₹{item.product.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-brown/10 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-brand-brown/80">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-brand-brown/80">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-brand-espresso pt-3 border-t border-brand-brown/10">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                className="w-full bg-brand-brown text-white py-4 rounded-md font-bold hover:bg-brand-espresso transition-colors shadow-lg flex justify-center items-center gap-2"
              >
                <ShieldCheck size={20} />
                Place Order (₹{total})
              </button>
              
              <p className="text-xs text-center text-brand-brown/50 mt-4">
                By placing your order, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
